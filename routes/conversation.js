const express = require('express')
const conversationRouter = express.Router()
const conversationController = require('../controller/conversation')

// Everything related to creating conversation
conversationRouter.get('/',conversationController.createConversation)

module.exports = conversationRouter