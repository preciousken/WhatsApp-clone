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
    isPinned:{
        type: Boolean,
        default:false,
    },
    isAchieved:{
        type: Boolean,
        default:false,
    }
})

const Conversation = mongoose.model('Conversation',conversationSchema)
module.exports = Conversation