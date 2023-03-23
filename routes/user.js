const express = require('express')
const userRouter = express.Router()
const {CreateUser} = require('../controller/user')

// create User
userRouter.post('/signup',CreateUser)

module.exports = userRouter