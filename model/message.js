const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    senderId:{
        type:String,
        required:true
    },
    senderName:{
        type:String,
        required:true,
    },
    receiverId:{
        type:String,
        required:true
    },
    receiverName:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true,
    },
    isSent:{
        type:Boolean,
        default:true
    },
    isRead:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timeStamps:true,
})

const Message = mongoose.model('Message',messageSchema)
module.exports = Message