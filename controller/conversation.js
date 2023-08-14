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

    // check if already pinned by user
    const alreadyPinned = await Conversation.findOne({
       isPinnedBy: {
        $in : [user._id]
       }
    })

    // if already pinned by user
    if(alreadyPinned){
        res.status(401).json({
            error : 'PIN_ERROR',
            status:false,
            message:`conversation pinned already`
        })
        return;
    }


    // if not pinned by user
    if(conversation){
        // UPDATE THE USER'S PIN CONVERSATION (if the user's senderId was saved in databse, turn the 
        // isPinned by sender true and vise versa)
        await Conversation.findByIdAndUpdate(
            body.conversationId,
            {$push:{
                isPinnedBy: user._id
            }},
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

      // check if already pinned by user
      const alreadyPinned = await Conversation.findOne({
        isPinnedBy: {
         $in : [user._id]
        }
     })


    //  handling error if the chat has not been pinned before by user
    if(!alreadyPinned){
        res.status(401).json({
            error : 'PIN_ERROR',
            status:false,
            message:`Chat not pinned yet`
        })
        return;
    }

    if(conversation){
        // UPDATE THE USER'S PIN CONVERSATION (if the user's senderId was saved in databse, turn the 
        // isPinned by sender false and vise versa)
        await Conversation.findByIdAndUpdate(
            body.conversationId,
            {$pull:{
                isPinnedBy: user._id
            }},
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

    
    try {
        // query the database for conversationId
        const conversation = await Conversation.find({
          $and: [
            { $or:[{receiverId: user._id}, {senderId : user._id} ],},
            {isPinnedBy:{
                $in: [user._id]
            }}
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
    
            res.status(400).json({
                status:true,
                message:`Conversation retrieved successfully`,
                Data: conversation,
                totalPinned:conversation.length
            })

            return

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


// Everything related to achieve a conversation
const achieveConversation = async (req,res)=>{
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

      // check if already pinned by user
    const alreadyAchieved = await Conversation.findOne({
        isAchievedBy: {
         $in : [user._id]
        }
     })
 
     // if already pinned by user
     if(alreadyAchieved){
         res.status(401).json({
             error : 'PIN_ERROR',
             status:false,
             message:`conversation achieved already`
         })
         return;
     }
 
     if(conversation){
         // UPDATE THE USER'S PIN CONVERSATION (if the user's senderId was saved in databse, turn the 
         // isPinned by sender true and vise versa)
         await Conversation.findByIdAndUpdate(
            body.conversationId,
            {$push:{
                isAchievedBy: user._id
            }},
            {new:true}
        )
    
     }
 
 
     try {
         res.status(400).json({
             status:true,
             message:`Conversation achieved successfully`,
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

// Everything related to unachieve a chat
const unAchieveConversation = async (req,res)=>{
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

    // check if already pinned by user
    const alreadyAchieved = await Conversation.findOne({
            isAchievedBy: {
             $in : [user._id]
            }
    })

    
    //  handling error if the chat has not been achieved before by user
    if(!alreadyAchieved){
        res.status(401).json({
            error : 'ACHIEVE_ERROR',
            status:false,
            message:`Chat not achieved yet`
        })
        return;
    }

  if(conversation){
      // UPDATE THE USER'S PIN CONVERSATION (if the user's senderId was saved in databse, turn the 
      // isPinned by sender false and vise versa)
      await Conversation.findByIdAndUpdate(
        body.conversationId,
        {$pull:{
            isAchievedBy: user._id
        }},
        {new:true}
    )
 
  }


  try {
      res.status(400).json({
          status:true,
          message:`Conversation unachieved successfully`,
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

// Everything related to getting achieved Conversation
const getAchievedChat = async ( req,res) =>{
 // getting the form data
    // body = req.body
    let user = req.user

    
    try {
        // query the database for conversationId
        const conversation = await Conversation.find({
          $and: [
            { $or:[{receiverId: user._id}, {senderId : user._id} ],},
            {isAchievedBy:{
                $in: [user._id]
            }}
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
    
            res.status(400).json({
                status:true,
                message:`Conversation retrieved successfully`,
                Data: conversation,
                totalPinned:conversation.length
            })

            return

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

module.exports={
    pinChat,
    unpinChat,
    getPinnedChat,
    achieveConversation,
    unAchieveConversation,
    getAchievedChat
}