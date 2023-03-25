const express = require('express')
const messageRouter = express.Router()
const { tokenRequired } = require('../middleware/auth')
const { sendMessage, getMessages } = require('../controller/message')

// send message
messageRouter.post('/send',tokenRequired,sendMessage)

// getting messages
messageRouter.get('/get',tokenRequired,getMessages)


module.exports = messageRouter