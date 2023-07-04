import React from "react";
import "./TextContainer.css";
import { Send } from "../../icons";

const TextContainer = () => {
  const SenderChat = ({ chatText }) => {
    return (
      <div className="chat">
        <p>{chatText} </p>
      </div>
    );
  };
  const UserChat = ({ chatText }) => {
    return (
      <div className="chatgroup">
        <p>{chatText}</p>
      </div>
    );
  };
  return (
    <div className="containerText">
      <h4>Live Chat</h4>

      <div className="text_container">
        <UserChat chatText={"Sample Text"} />
        <SenderChat chatText={"Sample Text"} />
        <UserChat chatText={"Sample Text"} />
        <SenderChat chatText={"Sample Text"} />
        <UserChat chatText={"Sample Text"} />
        <SenderChat chatText={"Sample Text"} />
        <UserChat chatText={"Sample Text"} />
        <SenderChat chatText={"Sample Text"} />
        <UserChat chatText={"Sample Text"} />
        <SenderChat chatText={"Sample Text"} />
      </div>
      <div className="textInput">
        <input className="text" type="text" placeholder="Type Message" />
        <button className="button">
          <Send />
        </button>
      </div>
    </div>
  );
};

export default TextContainer;
