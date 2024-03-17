import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from '../api/routes/user.route.js'
import authRoute from '../api/routes/auth.route.js'
import cookieParser from 'cookie-parser'

dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDb is connected")
}).catch((err)=>{
    console.log(err)
})



const app=express();


app.use(express.json());
app.use(cookieParser());

app.listen(3000, ()=>{
    console.log('Server is running on 3000 PORT');
})

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.use((err, req, res, next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})


