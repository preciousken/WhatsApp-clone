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
                user._id.toString() === conversation.senderId? true: conversation.isPinnedBySender,
            isPinnedByReceiver: 
                user._id.toString() === conversation.receiverId? true: conversation.isPinnedByReceiver,
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


// Everything related to unpinning a conversation
const unpinChat = async(req,res)=>{
    
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
        // isPinned by sender false and vise versa)
        await Conversation.findByIdAndUpdate(
            body.conversationId,
            {
                isPinnedBySender : 
                user._id.toString() === conversation.senderId? false: conversation.isPinnedBySender,
            isPinnedByReceiver: 
                user._id.toString() === conversation.receiverId? false: conversation.isPinnedByReceiver,
            },
            {new:true}
        )
   
    }


    try {
        res.status(400).json({
            status:true,
            message:`Conversation unpinned successfully`,
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


// Everything related to getting list of pinned Chats
const getPinnedChat = async (req,res)=>{
     
    // getting the form data
    // body = req.body
    let user = req.user

     // query the database for conversationId
     const conversation = await Conversation.find({
        $or:[{receiverId: user._id}, {senderId : user._id} ],
    
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
    
    // user._id === conversation.senderId


    try {

        
    if(conversation){
        // console.log(user._id,conversation);
            // if the user is the first to message the friend
            // Filter the Conversations pinned by the user
           

            
            res.status(400).json({
                status:true,
                message:`Conversation retrieved successfully`,
                Data: conversation,
                totalPinned:conversation.length
            })

            return   
    }

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


module.exports={pinChat,unpinChat,getPinnedChat}