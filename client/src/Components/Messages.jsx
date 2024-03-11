import React from "react";
import styled from "styled-components";
import { useRef , useEffect} from "react";

function Messages({ messages ,scrollRef }) {

  console.log(messages);
  if (messages) {
    return (
      <Container>
        <div className="chats" ref={scrollRef}>
        {messages.map((msg, index) => {
          return <div key={index} className={"message "+ (msg.sendSelf?"sended":"recieved")}>
            <div className="content">
                <p>{msg.message}</p>
            </div>
          </div>;
        })}
      </div>
      </Container>
    );
  } else {
    return <Container ref={scrollRef}>send your first message</Container>;
  }
}

const Container = styled.div`
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  padding: 1rem 2rem;
  .chats{
    display:flex;
    flex-direction:column;
    gap:1rem;
  }
  .message{
    display:flex;
    width:100%;
    line-height:2rem;
  }
  .content{
    background-color:#02f3d332;
    color:white;
    padding:5px 15px;
    font-size:1.25rem;
    border-radius:15px;
    max-width:60%;
    word-break:break-word;
  }
  .sended{
    justify-content:flex-end;
  }
  .recieved{
    justify-content:flex-start;
  }
`;

export default Messages;
