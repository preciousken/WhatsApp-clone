const express = require('express')
const userRouter = express.Router()
const {SignUp,SignIn} = require('../controller/user')
const { tokenRequired } = require('../middleware/auth')

// signup user
userRouter.post('/signup',SignUp)

// login user
userRouter.post('/signin',SignIn)

module.exports = userRouter