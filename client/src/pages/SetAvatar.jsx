import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Buffer } from "buffer";
import { ToastContainer,toast} from "react-toastify";
import { setAvatarRoute } from "../utils/APIRoutes.js";

const SetAvatar = () => {
  const api = `https://api.multiavatar.com/${import.meta.env.VITE_AVATAR_KEY}`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(3);

  const toastOptions={
    position:"bottom-right",
    theme:"light",
    autoclose:4000,
    draggable:true,
  }

  const checkUser=async()=>{
      let currUser=await JSON.parse(localStorage.getItem("chat-app-user"));
      if(!currUser){
        navigate("/login");
      }else if(currUser.isAvatarSet){
        navigate("/")
      }
  };

  

  const setProfilePicture=async()=>{
    if(selectedAvatar===undefined){
      toast.error("Please select an avatar",toastOptions);
    }
    let user=await JSON.parse(localStorage.getItem("chat-app-user"));
    const { data }=await axios.post(`${setAvatarRoute}/${user._id}`,{avatarImage:avatars[selectedAvatar]});
    if(data.status){
      localStorage.setItem("chat-app-user",JSON.stringify(data));
      navigate("/")
    }else{
      toast.error("Error setting avatar,please try again",toastOptions);
    }
  }
  const fetchData = async () => {
    let data=[];
    for (let i = 0; i < 4; i++) {
      const response = await axios.get(
        `${api}/${Math.round(Math.random() * 10000)}?apikey=Dvu5O82tfP6hGw`
      );

      const buffer = new Buffer(response.data);
      data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setLoading(false);
}

  useEffect(() => {
      checkUser();
      fetchData();
    }, []);

  if(loading){
    return (
        <Container>
            <h1>Loading...</h1>
        </Container>
    )
  }

  console.log(selectedAvatar);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick An Avatar for your Profile</h1>
        </div>
        <div className="avatar-container">
            {avatars.map((avatar,index)=>{
                return(
                    <div key={index} className={"avatar"+(selectedAvatar===index?" selected":"")}>
                        <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={()=> (selectedAvatar===index?setSelectedAvatar():setSelectedAvatar(index))} />
                    </div>
                )
            })}
        </div>
        <button type="button" onClick={()=>{setProfilePicture()}}>Set Profile Picture</button>
        <ToastContainer></ToastContainer>
      </Container>
      ;
    </>
  );
};

const Container = styled.div`
  background-color: #1e1e1e;
  color: #fef134;
  display: flex;
  flex-direction:column;
  width: 100%;
  height: 100vh;
  gap:2rem;
  align-items: center;
  justify-content: center;
  h1{
    font-size:max(4vw,2rem);
    font-weight:500;
  }
  .avatar-container{
    display:flex;
    width:100%;
    justify-content:center;
    gap:.5em;
    flex-wrap:wrap;
    & div{
        border:solid transparent 5px;
        border-radius:50%;
        padding:5px;
        transition:all .4s ease-out;
        &:hover{
            border:solid orange 5px;
        }
    }
  }

  .selected.avatar{
    border-color:yellow;
  }

  button{
    font-size:30px;
    padding:10px;
    background-color:#000;
    box-shadow:2px 0px 10px #ffffff12;
    color:#ffd;
    font-weight:800;
    border-radius:2px;
    border:none;
  }


  img{
    width:150px;
    height:150px;
  }
`;

export default SetAvatar;
