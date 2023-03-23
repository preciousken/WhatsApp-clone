const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


// register user
const SignUp = async (req,res)=>{

    // getting the form data
    let body = req.body;

    // converting to lowerCase
    body.email = req.body.email.toLowerCase()
    body.userName = req.body.userName.toLowerCase()
    

    // handling Data Error
    if(!body.password ||
        !body.email ||
        !body.phone ||
        !body.userName
        ){
        res.status(401).json({
            error : 'DATA_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }

    // query the database if email already exists
    const eMail = await User.findOne({email:body.email.toLowerCase()})

    // query the database if username already exists
    const userName = await User.findOne({userName:body.userName.toLowerCase()})

    // query the database if phone already exists
    const phone = await User.findOne({phone:body.phone})


    // handling error if eMail or userName exists
    if( eMail || userName || phone){
        res.status(401).json({
            error : 'DUPLICATE_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }
    try {

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(body.password, salt, async function(err, hash) {
                body.password = hash
                // Store hash in your password DB.
                const user = new User(body);
                await user.save()

        res.status(400).json({
            status:true,
            message:`User created successfully`,
            userData: user
        })
            });
        });
    } catch (error) {
        res.status(500).json({
            error : 'UNKNOWN_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }
}





// SignIn user
const SignIn = async(req,res)=>{

    // getting the Form Data
    body = req.body


    // handling error if password provided
    if(!body.password ||
        !body.phone){
        res.status(401).json({
            error : 'DATA_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }


    // querying the db if phoneNumber exists
    const user = await User.findOne({phone:body.phone})


    // handling error if phone does'nt exist
    if(!user){
        res.status(401).json({
            error : 'PHONE_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }

    
    try {

    bcrypt.compare(body.password, user.password, function(err, result) {
        

        // if the password was correct
        if(result){

            // assign a jsonwebtoken
            token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: {
                    id:user._id
                }
              }, process.env.JWT_SECRET);


        res.status(400).json({
            status:true,
            message:`User loggedIn successfully`,
            token: token
        })
        return;
        }


        // if the password was wrong 
        res.status(500).json({
            error : 'AUTHENTICATION_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    });

    } catch (error) {
        res.status(500).json({
            error : 'UNKNOWN_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }
}



module.exports = {SignUp,SignIn}