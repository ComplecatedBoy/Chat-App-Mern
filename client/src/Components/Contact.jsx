import React, { useState,useEffect } from 'react';
import styled from 'styled-components';

function Contact ({contacts,currentUser,changeChat}) {

    const [currUserName,setCurrUserName]=useState();
    const [currUserImage,setCurrUserImage]=useState();
    const [selectedUser,setSelectedUser]=useState();

  
    useEffect(()=>{
        if(currentUser){
            setCurrUserName(currentUser.username);
            setCurrUserImage(currentUser.avatarImage);  
        }
    },[currentUser])

  const changeCurrChat=(contact,index)=>{
    console.log("selected");
       setSelectedUser(index);
       changeChat(contact);
    }

    return ( <Container>
        <div className="header">
            Chats
        </div>
        <div className='contacts'>
            {contacts.map((contact,index)=>{
                return (
                    <div key={index} className={'contact'+(selectedUser===index?" selected":"")} onClick={()=>changeCurrChat(contact,index)} >
                        <div className={"avatar"}>
                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar"/>
                        </div>
                        <div className="username">
                            <h3>{contact.username}</h3>
                        </div>
                    </div>
                );
            })}
        </div>
        <div className='logged-user'>
                        <div className="avatar ">
                        <img src={`data:image/svg+xml;base64,${currUserImage}`} alt="avatar"/>
                        </div>
                        <div className="username">
                            <h3>{currUserName}</h3>
                        </div>
                </div>
    </Container> );
}

const Container=styled.div`
text-transform:capitalize;
background-color:#54145513;
border-right:solid orange 1px;
width:100%;
overflow:hidden;
height:90vh;
display:grid;
grid-template-rows:auto 1fr auto;
gap:15px;
border-radius:inherit 0 inherit 0;
div{
    padding:1rem;
}

.selected{
    color:#ff00ff;
    box-shadow:2px 2px 2px #ffffff14;
}
.header{
    padding:1rem;
    text-align:center;
    font-size:2rem;
    text-transform:uppercase;
    font-weight:900;
}
img{
    width:60px;
}
.contacts{
    padding:0;
    overflow:scroll scroll;
    &::-webkit-scrollbar{
        width:10px;
        height:0;
    }
    &::-webkit-scrollbar-track{
        background-color:#ffffff00;
    }
    &::-webkit-scrollbar-thumb{
        background-color:#fff77700;
    }
    &:hover::-webkit-scrollbar-track{
         background-color:#ffffff22;
    }
    &:hover::-webkit-scrollbar-thumb{
        background-color:#fff77788;
    }
}
.contact{
    margin-top:1rem;
    padding:0;
    display:flex;
    align-items:center;
    background-color:#fff77709;
    &:nth-of-type(1){
        margin-top:0;
    }
    
    h3{
        font-weight:200;
        padding:0;
    }
    border-bottom:1px solid #fff77722;
    &:hover{
        background-color:#fff77712;
    }
}
.logged-user{
    *{
        padding:0;
    }
    justify-content:center;
    display:flex;
    flex-direction:column;
    align-items:center;
    h3{
        font-weight:400;
    }
    font-size:30px;
    img{
        width:100px;
    }
}`
export default Contact;
