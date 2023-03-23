const Message = require("../model/message")
const User = require("../model/user")

// send message
const sendMessage = async (req,res)=>{

    // getting the form Data
    body = req.body
    let user = req.user
    
    // attaching values to the body object
    body.senderId = user._id

    // handling error for the form data
    if(!body.receiverId ||
        !body.message ||
        !body.senderId){
        res.status(500).json({
            error : 'DATA_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }

    // User must not message himself
    if(body.senderId === body.receiverId){
        res.status(500).json({
            error : 'DATA_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }

    // query the database if receiver exists
    const receiver = await User.findById(body.receiverId);

    // if the receiver doesn't exist
    if(!receiver){
        res.status(500).json({
            error : 'DATA_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }


    // console.log(receiver);
    // return

    body.senderName = user.userName;
    body.receiverName = receiver.userName

try {

    const message = new Message(body);
    await message.save()
    
    
    res.status(400).json({
        status:true,
        message:`Message sent successfully`,
        Data: message
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

module.exports = {sendMessage}