import React from "react";
import styles from './TextContainer.module.css'
import { Send } from "../../icons";


const TextContainer = () => {
  const SenderChat = ({ chatText }:any) => {
    return (
      <div className={styles.chat}>
        <p>{chatText} </p>
      </div>
    );
  };
  const UserChat = ({ chatText }:any) => {
    return (
      <div className={styles.chatgroup}>
        <p>{chatText}</p>
      </div>
    );
  };
  return (
    <div className={styles.containerText}>
      <h4>Live Chat</h4>
      <div className={styles.text_container}>
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

      
      <div className={styles.textInput}>
        <input className={styles.text} type="text" placeholder="Type Message" />
        <button className={styles.button}>
          <Send />
        </button>
      </div>
    </div>
  );
};

export default TextContainer;
