const express = require('express')
const conversationRouter = express.Router()
const conversationController = require('../controller/conversation')
const { tokenRequired } = require('../middleware/auth')

conversationRouter.post(
'/pin',
tokenRequired,
conversationController.pinChat
)

conversationRouter.post(
'/unpin',
tokenRequired,
conversationController.unpinChat
)

conversationRouter.get(
'/getPinnedChats',
tokenRequired,
conversationController.getPinnedChat
)

conversationRouter.post(
'/achieve',
tokenRequired,
conversationController.achieveConversation
)

conversationRouter.post(
'/unachieve',
tokenRequired,
conversationController.unAchieveConversation
)

conversationRouter.get(
'/getAchievedChats',
tokenRequired,
conversationController.getAchievedChat
)


module.exports = conversationRouter