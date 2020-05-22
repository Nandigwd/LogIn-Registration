require('dotenv').config;
const express = require('express');
const app = express();
const userRouter = require('./api/user/user_routers');

app.use(express.json()); // convert the resoponce objects in json format 

app.use('/api', userRouter);


app.listen(5000,()=>{
    console.log("server up and started");
});