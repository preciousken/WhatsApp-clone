const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    conversations:[
        {
            conversationId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Conversations'
            }
        }
    ],
    posts:[
        {
        postId:{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Posts'
        }
     }
    ]
})

const User = mongoose.model('User',userSchema)
module.exports = User