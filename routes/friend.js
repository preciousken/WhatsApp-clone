const express = require('express');
const { SearchFriends } = require('../controller/friend');
const { tokenRequired } = require('../middleware/auth');
const friendRouter = express.Router()

// Everything related to searching for friends
friendRouter.get('/find',tokenRequired,SearchFriends)

module.exports = friendRouter