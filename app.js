const express = require('express');
const userRouter = require('./routes/user');
const app = express()
require('dotenv').config();

app.use(express.json())



app.get('/',async(req,res)=>{
    try {
        res.status(400).json({
            status:true,
            message:{
                welcome:"The API service is ready for use"
            }
        })
        return;
    } catch (error) {
        error = 'UNKNOWN_ERROR'
        res.status(500).json({
            status:false,
            message:`You've got some errors`
        })
        return;
    }
})

app.use('/user',userRouter)

port = process.env.PORT
app.listen(port,()=>{
    require('./db/connect')
    console.log(`
    App listening on port ${port}`);
})