const express = require('express')
const messageRouter = express.Router()
const { tokenRequired } = require('../middleware/auth')
const { sendMessage } = require('../controller/message')

// send message
messageRouter.post('/send',tokenRequired,sendMessage)

module.exports = messageRouter