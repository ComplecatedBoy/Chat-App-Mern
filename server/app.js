const express = require("express")
const app=express();
const mongoose= require("mongoose");
const cors =require("cors")
const authRouter= require("./Routes/authRouter");
const messageRouter = require("./Routes/messageRouter");
const socket = require("socket.io");

require("dotenv").config();
const main=async ()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connection to MongoDB established successfully");
    })
    .catch((err)=>{
        console.log(err.message)
    })
}
main();

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/messages",messageRouter);

let server=app.listen(process.env.PORT,()=>{
    console.log(`listening to port ${ process.env.PORT}`)
})

const io = socket(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true
    }
});

global.onlineUsers=new Map();


io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });


    
    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message);
        }
    })
})

