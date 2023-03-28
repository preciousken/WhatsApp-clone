const Conversation = require("../model/conversation");

// Everything related to pinning a conversation
const pinChat = async(req,res)=>{

    // getting the form data
    body = req.body
    let user = req.user
    
    // handling error if no conversationId provided
    if(!body.conversationId){
        res.status(401).json({
            error : 'DATA_ERROR',
            status:false,
            message:`You've got some errors`
        })
        return;
    }

     // query the database for conversationId
     const conversation = await Conversation.findOne({
       $and:[
        { $or:[{receiverId: user._id}, {senderId : user._id} ]},
        {_id: body.conversationId}
       ]
    })
    
    // handling error when conversation doesn't exists
    if(!conversation){
        res.status(401).json({
            error : 'DATA_ERROR',
            status:false,
            message:`No such conversation`
        })
        return;
    }

    if(conversation){
        // UPDATE THE USER'S PIN CONVERSATION (if the user's senderId was saved in databse, turn the 
        // isPinned by sender true and vise versa)
        await Conversation.findByIdAndUpdate(
            body.conversationId,
            {
                isPinnedBySender : 
                user._id.toString() === conversation.senderId? true: false,
            isPinnedByReceiver: 
                user._id.toString() === conversation.receiverId? true: false,
            },
            {new:true}
        )
   
    }


    try {
        res.status(400).json({
            status:true,
            message:`Conversation pinned successfully`,
            // Data: user
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


module.exports={pinChat}