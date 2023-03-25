// getting required components
const User = require("../model/user")


// Everything related to searching for a friend using their phone numbers
const SearchFriends = async(req,res)=>{
    try {
        
        // getting the form data
        body = req.body

        // handling error if no phonenumber provided
        if(!body.phone){
            res.status(500).json({
                error : 'UNKNOWN_ERROR',
                status:false,
                message:`You've got some errors`
            })
            return;  
        }


        // querying the db for the phone number
        const user = await User.findOne({phone : body.phone})
        
        if(!user){
            res.status(500).json({
                error : 'POHNE_ERROR',
                status:false,
                message:`You've got some errors`
            })
            return;
            }
            
        
    res.status(400).json({
        status:true,
        message:`Friend fetched successfully`,
        Data: user
    })
    return;
    } catch (error) {
        res.status(500).json({
            error : 'UNKNOWN_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }
}


module.exports = {SearchFriends}