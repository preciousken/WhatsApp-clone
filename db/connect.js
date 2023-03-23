require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then((res)=>{
    console.log(`Database Connected Successfully`);
}).catch((err)=>{
    console.log(err);
})