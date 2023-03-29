const express = require('express')
const conversationRouter = express.Router()
const conversationController = require('../controller/conversation')
const { tokenRequired } = require('../middleware/auth')

// Everything related to pinning a conversation
conversationRouter.post(
'/pin',
tokenRequired,
conversationController.pinChat
)

// Everything related to unpinning a conversation
conversationRouter.post(
'/unpin',
tokenRequired,
conversationController.unpinChat
)

// Everything related to getting list of pinned chats
conversationRouter.get(
'/getPinnedChats',
tokenRequired,
conversationController.getPinnedChat
)

// Everything related to achieve chat
conversationRouter.post(
'/achieve',
tokenRequired,
conversationController.achieveConversation
)

// Everything related to unachieve chat
conversationRouter.post(
'/unachieve',
tokenRequired,
conversationController.unAchieveConversation
)


// Everything related to getting list of achieved chats
conversationRouter.get(
'/getAchievedChats',
tokenRequired,
conversationController.getAchievedChat
)


module.exports = conversationRouter