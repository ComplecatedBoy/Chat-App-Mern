import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import styled from "styled-components";

function ChatInput({handleSendMessage}) {
  const [EmojiOpen, setEmojiOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiClick = (data, event) => {
    let emoji=data.emoji;
    setMsg((msg)=>msg+emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmojiOpen(false);
    let message=msg;
    if(message.length>0){
        setMsg("");
        handleSendMessage(message);
    }
  };
  const handleMsgChange = (e) => {
    e.preventDefault();
    setMsg(e.target.value);
  };

  return (
    <Container>
      <div className="emoji icons">
        <BsEmojiSmileFill
          onClick={() => {
            setEmojiOpen(!EmojiOpen);
          }}
        />
        <EmojiPicker
          className="picker"
          open={EmojiOpen}
          onEmojiClick={(data, event) => handleEmojiClick(data, event)}
          theme="dark"
          width={500}
          height={600}
        ></EmojiPicker>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={msg}
          onChange={handleMsgChange}
          className="msgInput"
        />
        <button className="btn" type="submit">
          <MdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  //   align-items: center;
  font-size: 2rem;
  padding: 1.5rem;
  place-items: center;
  gap: 1rem;
  .emoji {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  form {
    width: 100%;
    display: flex;
    gap: 1rem;
    input {
      width: 100%;
    }
  }
  .btn {
    border: none;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    background-color: inherit;
    display: grid;
    place-items: center;
  }
  .msgInput {
    padding: 0.5rem 1rem;
    background-color: #00ff0055;
    color: white;
    outline: none;
    border: none;
    font-size: 1.25rem;
    font-weight: 500;
  }

  .picker {
    position: absolute;
    bottom: 2.25rem;
    left: -1rem;
  }
`;

export default ChatInput;
