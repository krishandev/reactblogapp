import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from '../api/routes/user.route.js'
import authRoute from '../api/routes/auth.route.js'
import postRoute from '../api/routes/post.route.js'
import commentRoute from '../api/routes/comment.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("MongoDb is connected")
}).catch((err)=>{
    console.log(err)
})

const __dirname=path.resolve();

const app=express();


app.use(express.json());
app.use(cookieParser());

app.listen(3000, ()=>{
    console.log('Server is running on 3000 PORT');
})

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use((err, req, res, next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})


