const mongoose = require('mongoose')

const conversationSchema = mongoose.Schema({
    senderId :{
        type: String,
        required:true,
    },
    receiverId: {
        type: String,
        required: true,
    }, 
    receiverName:{
        type: String,
        required:true,
    },
    latestMessage:{
        type:String,
    },
    isPinnedBy:[
        {
            type:String,
        }
    ],
    isAchievedBy:[
        {
            type:String,
        }
    ],
    // isPinnedBySender:{
    //     type: Boolean,
    //     default:false,
    // },
    // isPinnedByReceiver:{
    //     type: Boolean,
    //     default:false,
    // },
    // isAchievedBySender:{
    //     type: Boolean,
    //     default:false,
    // },
    // isAchievedByReceiver:{
    //     type: Boolean,
    //     default:false,
    // }
})

const Conversation = mongoose.model('Conversation',conversationSchema)
module.exports = Conversation