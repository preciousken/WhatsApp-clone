// getting required components
const Message = require("../model/message")
const User = require("../model/user")
const Conversation = require('../model/conversation')

// Everything related to sending of messages
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

    // check qeury the db for conversation
    const conversation = await Conversation.findOne({
        senderId:body.senderId.toString() ,
        receiverId:body.receiverId.toString() ,
    })


    if(!conversation){
        // create a conversation
        const newConversation = new Conversation({
            senderId: body.senderId,
            receiverId: body.receiverId,
        })

        const status = await newConversation.save()


    // push conversation into the user Object
    const conversations = await User.findOneAndUpdate(
        {_id : body.senderId},
        {
        $push: {
            'conversations.conversationId': status._id
        }},
        {new:true}
    )
    }

    // console.log(receiver);
    // return

    body.senderName = user.userName;
    body.receiverName = receiver.userName

    
    // User must not message himself
    if(body.senderId.toString() === body.receiverId.toString()){
        res.status(500).json({
            error : 'DATA_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }

    

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


// getting messages by Receiver Id
const getMessages = async(req,res) => {
    try {

        // getting the form data
        body = req.body
        let user = req.user

        // handling error if no receiver Id provided
        if(!body.receiverId){
            res.status(500).json({
                error : 'UNKNOWN_ERROR',
                status:false,
                message:`No receiver provided`
            })
            return;
        }

        // query database if the receiverId exists
        const exist = await User.findById(body.receiverId);


        // handling error if the Id doesn't exist
        if(!exist){
            res.status(401).json({
                error : 'RECEIVER_ERROR',
                status:false,
                message:`You've got some errors`
            })
            return;
        }


            // querying the db for messages
            const messages = await Message.find({
                $or:[
                   {$and:[
                    {receiverId: user._id},
                    {senderId : body.receiverId}
                   ]},

                   {$and:[
                    {receiverId: body.receiverId},
                    {senderId : user._id}
                   ]},
                ]
            })
        
    res.status(400).json({
        status:true,
        message:`Messages retrieved successfully`,
        Data: messages
    })
    return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error : 'UNKNOWN_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }
}


module.exports = {sendMessage,getMessages}