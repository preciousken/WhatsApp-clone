require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../model/user');


const tokenRequired = async (req,res,next)=>{
    let token = req.headers.whatsapp_token
    if(!token){
        return res.status(500).json({
            error : 'TOKEN_ERROR',
            status:false,
            message:`You've got some errors`
        })
    }
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.data.id){
            const user = await User.findById(decoded.data.id);
            req.user = {
                _id: user._id,
                email: user.email,
                phone: user.phone,
                userName: user.userName
            }
          next()
        }
      } catch(err) {
        res.status(500).json({
            error : 'INVALID_TOKEN_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
      }
    

    try {  
    } catch (error) {
        res.status(500).json({
            error : 'AUTHENTICATION_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }
}

module.exports = {tokenRequired}