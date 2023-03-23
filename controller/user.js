const User = require('../model/user')

const CreateUser = async (req,res)=>{

    // getting the form data
    const body = req.body;

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
    const eMail = User.findOne({email:body.email.toLowerCase()})

    // query the database if username already exists
    const userName = User.findOne({userNmae:body.userName.toLowerCase()})

    // query the database if phone already exists
    const phone = User.findOne({phone:body.phone})


    // handling error if eMail or userName exists
    if(eMail || 
        userName ||
        phone){
        res.status(401).json({
            error : 'DUPLICATE_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }
    

    try {

    const user = new User(body);
    await user.save()

        res.status(400).json({
            status:true,
            message:`User created successfully`,
            userData: user
        })
    } catch (error) {
        res.status(500).json({
            error : 'UNKNOWN_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }
}

module.exports = {CreateUser}