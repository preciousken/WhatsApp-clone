const express = require('express')
const conversationRouter = express.Router()
const conversationController = require('../controller/conversation')
const { tokenRequired } = require('../middleware/auth')

// Everything related to pinning a conversation
conversationRouter.post('/pin',tokenRequired,conversationController.pinChat)

module.exports = conversationRouter