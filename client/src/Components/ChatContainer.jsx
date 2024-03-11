import React, { useEffect, useState,useRef } from "react";
import styled from "styled-components"
import Logout from "./logout.jsx"
import ChatInput from "./ChatInput.jsx"
import Messages from "./Messages.jsx";
import axios from "axios";
import { sendMessageRoute,getAllMessageRoute } from "../utils/APIRoutes.js"


function ChatContainer({ sender, reciever, socket }) {
    const[recieverImage,setRecieverAvatar]=useState();
    const[recieverName,setRecieverName]=useState();
    const scrollRef=useRef();
    const [message,setMessage]=useState([]);
    const [arrivalMessage,setArrivalMessage]=useState();

    useEffect(()=>{
        if(reciever)
       { setRecieverAvatar(reciever.avatarImage);
        setRecieverName(reciever.username);
        handleGetMessage();
       }
    },[reciever]);

    const handleSendMessage=async(msg)=>{
      await axios.post(sendMessageRoute,{
        from:sender._id,
        to:reciever._id,
        message:msg
      })

      socket.current.emit("send-msg",{
        to:reciever._id,
        from:sender._id,
        message:msg
      })
      setMessage(p=>[...message,{sendSelf:true,message:msg}]);
    }
    const handleGetMessage=async()=>{
      const response=await axios.post(getAllMessageRoute,{
        from:sender._id,to:reciever._id
      })
      console.log(response.data);
    setMessage(response.data.data);
    }

    useEffect(()=>{
      if(socket.current){
        socket.current.on("msg-recieve",(msg)=>{
          setArrivalMessage({sendSelf:false,message:msg});
        })
      }
    },[]);

    useEffect(()=>{
      arrivalMessage && setMessage(p=>[...p,arrivalMessage]);
    },[arrivalMessage])

    useEffect(()=>{
      scrollRef.current?.scrollIntoView({block:"end",behavior:"smooth"});
    },[message])
    
  return (
    <Container>
      <div className="header">
        <div className="user-details">
          <div className="avatar">
          <img src={`data:image/svg+xml;base64,${recieverImage}`} alt="avatar"/>
          </div>
          <div className="username">
            <h2>{recieverName}</h2>
          </div>
        </div>
        <Logout></Logout>
      </div>
      <Messages messages={message} scrollRef={scrollRef}></Messages>
      <ChatInput handleSendMessage={handleSendMessage}></ChatInput>
      
    </Container>
  );
}

const Container = styled.div`
  display:grid;
  grid-template-rows:1fr 8fr 1fr;
  // background-color:red;
  height:100%;
  overflow:hidden;
  .header,.input{
    background-color:#00ff4517;
    padding:.5rem 2rem
  }
  .header{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .user-details{
    display:flex;
    align-items:center;
    gap:1rem;
    text-transform:capitalize;
  }
  .avatar{
    height:50px;
    width:50px;
}
img{
    height:100%;
    width:100%;
}
`;

export default ChatContainer;
