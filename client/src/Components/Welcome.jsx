import React from 'react';
import styled from 'styled-components';

function Welcome({user}) {

    return ( <Container>
        <div>
           <h1>Welcome...{user.username}</h1>
        <h3>Please select a chat to start message</h3> 
        </div>
        
    </Container> );
}

const Container=styled.div`
font-size:30px;
display:flex;
align-items:center;
justify-content:center;
color:white;
h1{
    font-weight:400;
}
h3{
    font-weight:200;
}
`
export default Welcome;