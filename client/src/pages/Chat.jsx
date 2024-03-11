import React,{useState,useEffect,useRef} from "react";
import styled from "styled-components";
import axios from "axios";
import { getContactsRoute ,host } from "../utils/APIRoutes.js"
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Contact from "../Components/Contact.jsx"
import Welcome from "../Components/Welcome.jsx";
import ChatContainer from "../Components/ChatContainer.jsx";
import {io} from "socket.io-client"
const Chat=()=>{
    const socket=useRef();
    const[contacts,setContacts]=useState([]);
    const[currentUser,setCurrentUser]=useState(undefined);
    const[currChat,setCurrChat]=useState(undefined);
    const navigate=useNavigate();
    const toastOptions={
        position:"bottom-right",
        theme:"dark"
    }

    const handleChatChange=(chat)=>{
        setCurrChat(chat);
    }
    
    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login");
        }else{
            let handleCurrentUser=async()=>{
                let user=await JSON.parse(localStorage.getItem("chat-app-user"))
                setCurrentUser(user);
            }
            handleCurrentUser();
        }
    },[])

    useEffect(()=>{
        if(currentUser){
            socket.current=io(host)
            socket.current.emit("add-user",currentUser._id);
        }
    },[currentUser]);

    useEffect(()=>{
        let getAllUsers=async()=>{
            let response=await axios.get(`${getContactsRoute}/${currentUser._id}`);
            let data=response.data;
            if(data.status){
                setContacts(data.users)
            }
            else{
                toast.error("something went wrong",toastOptions);
            }
        }
        if(currentUser){
            if(currentUser.isAvatarSet){
                getAllUsers();
            }else{
                navigate("/setAvatar");
            }
        }
    },[currentUser])

    return(
        <Container>
            <div className="container">
                <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}></Contact>
                {currentUser && !currChat?<Welcome user={currentUser}></Welcome>:<ChatContainer reciever={currChat} socket={socket} sender={currentUser}></ChatContainer>}
            </div>
            <ToastContainer></ToastContainer>
        </Container>
    )
}

const Container=styled.div`
display: flex;
justify-content:center;
align-items:center;
width:100%;
height:100vh;
background-color:#1e1e1e;
color:#fef134;
.container{
    width:80vw;
    height:90vh;
    background-color: #111111;
    border-radius:10px;
    display:grid;
    grid-template-columns:25% 75%;
    @media screen and (min-width:600px) and (max-width:1024px){
        grid-template-columns:35% 65%;
    }
}

`

export default Chat