const express = require('express');
const userRouter = require('./routes/user');
const messageRouter = require('./routes/message');
const friendRouter = require('./routes/friend');
const app = express()
require('dotenv').config();

app.use(express.json())



app.get('/',async(req,res)=>{
        res.status(400).json({ welcome:"The API service is ready for use" })
        return;
    })

// Everything related to user routes
app.use('/user',userRouter);

// Everything related to message routes
app.use('/message',messageRouter)

// Everything related to friend routes
app.use('/friend',friendRouter)

port = process.env.PORT
app.listen(port,()=>{
    require('./db/connect')
    console.log(`
    App listening on port ${port}`);
})

app.use('*',(req,res)=>{
        res.status(400).json({ message:"Just like that, you completely missed your way 😂😂" })
        return;
})