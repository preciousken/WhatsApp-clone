const express = require('express')
const conversationRouter = express.Router()
const conversationController = require('../controller/conversation')
const { tokenRequired } = require('../middleware/auth')

// Everything related to pinning a conversation
conversationRouter.post('/pin',tokenRequired,conversationController.pinChat)

// Everything related to unpinning a conversation
conversationRouter.post('/unpin',tokenRequired,conversationController.unpinChat)

module.exports = conversationRouter