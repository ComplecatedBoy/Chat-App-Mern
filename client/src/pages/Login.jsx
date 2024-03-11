import React, { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { styled } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes"

const Login = () => {
  const navigate=useNavigate();
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });
  let toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
    navigate("/");
  }
  },[]);
  

  const handleSubmit = async (e) => {
    let { username,password} = inputValues;
    e.preventDefault();
    if (ValidateForm()) {
      try {
        const { data } = await axios.post(loginRoute, {
          username,
          password
        });

        if(!data.status){
          toast.error(data.msg,toastOptions);
        }else{
          localStorage.setItem("chat-app-user",JSON.stringify(data));
          navigate("/")
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };



 

  const ValidateForm = () => {
    let { username, password} = inputValues;
    if (username === "" || password=="") {
      toast.error("Username and Password are Required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Log In</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Submit</button>
        <div>
          Don't have an account? <Link to="/register">Create</Link>
        </div>
      </form>
      <ToastContainer></ToastContainer>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  background-color: #1e1e1e;
  color: #fef134;
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #111111;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 0px 5px #ffffff12;
    h1 {
      text-align: center;
      font-size: 3rem;
    }
    input,
    button {
      color: #ffefff77;
      font-size: 1.25rem;
      padding: 0.5rem 1rem;
      background-color: #020f12;
      font-weight: 400;
      border: none;
      border: 1px solid #0ff00033;
      border-radius: 5px;
      &:hover,
      &:focus {
        outline: none;
        border: 1px solid #0ff00077;
      }
      &::placeholder {
        font-size: 1rem;
      }
    }
    button {
      border: 1px solid transparent;
      background-color: #02ff1255;
      color: #ffffff;
      font-weight: 600;
      text-transform: uppercase;
      font-family: sans-serif;
      letter-spacing: 1px;
    }
    div {
      text-transform: uppercase;
      letter-spacing: 1px;
      a {
        text-decoration: none;
        color: #e3e4f1;
        font-weight: 700;
      }
    }
  }
`;

export default Login;
