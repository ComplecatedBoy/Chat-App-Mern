import React from 'react';
import { BiPowerOff } from "react-icons/bi";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.clear();
        navigate("/login");
    }

    return ( <Container><BiPowerOff onClick={()=>handleLogout()}/></Container>);
}
const Container=styled.div`
font-size:30px;
 
`;

export default Logout;