import React, { useEffect, useState } from 'react';
import './TextContainer.css';
import { Send } from '../../icons';
import { ChatRoom } from 'amazon-ivs-chat-messaging';
import * as AWS from 'aws-sdk';
import axios from 'axios';
import { useWebSocket } from 'react-use-websocket';

const TextContainer = () => {
  // let chatConnection;
  const [chatConnection, setChatConnection] = useState(null);
  const [token, setToken] = useState(null);
  const endpoint = 'wss://edge.ivschat.ap-south-1.amazonaws.com';
  const [messages, setMessages] = useState<[]>([]);
  const [chatInput, setChatInput] = useState('');
  const username =
    'user' + (Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000).toString();

  const fetchToken = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/gentoken`);
      const data = response.data;
      
      setToken(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChatSubmit = () => {
    const payload = {
      action: 'SEND_MESSAGE',
      content: chatInput,
      attributes: {
        username: username,
      },
    };

    try {
      if (token && endpoint && chatConnection) {
        chatConnection.send(JSON.stringify(payload));
      }
    } catch (error) {
      console.error(error);
    }

    setChatInput('');
  };

  const handleIncomingMessages = (event: any) => {
    const data = JSON.parse(event.data);
    setMessages((prevMessages) => [...prevMessages, data]);
  };
  useEffect(() => {
    fetchToken();
  }, []);
  useEffect(() => {
    if (token && endpoint) {
      const connection: any = new WebSocket(endpoint, token);
      connection.onmessage;
      setChatConnection(connection);
      connection.onmessage = (event: any) => {
        const data = JSON.parse(event.data);
        console.log(data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };
    }
    if (chatConnection) {
      chatConnection.onmessage = handleIncomingMessages;
      console.log();
    }

    // console.log()

    return () => {
      if (token && endpoint && chatConnection) {
        chatConnection.close();
      }
    };
  }, [messages]);

  // const SenderChat = ({ chatText }) => {
  //   return (
  //     <div className="chat">
  //       <p>{chatText} </p>
  //     </div>
  //   );
  // };
  // const UserChat = ({ chatText }) => {
  //   return (
  //     <div className="chatgroup">
  //       <p>{chatText}</p>
  //     </div>
  //   );
  // };
  return (
    <div className="containerText">
      <h4>Live Chat</h4>

      <div className="text_container">
        {/* <UserChat chatText={'Sample Text'} />
        <SenderChat chatText={'Sample Text'} />
        <UserChat chatText={'Sample Text'} />
        <SenderChat chatText={'Sample Text'} />
        <UserChat chatText={'Sample Text'} />
        <SenderChat chatText={'Sample Text'} />
        <UserChat chatText={'Sample Text'} />
        <SenderChat chatText={'Sample Text'} />
        <UserChat chatText={'Sample Text'} />
        <SenderChat chatText={'Sample Text'} /> */}
        {messages.length > 0 &&
          messages.map((msg: any, index) => (
            <>
              <p key={index}>
                {msg.Attributes.username} : {msg.Content}
              </p>
            </>
          ))}
      </div>
      <div className="textInput">
        <input
          className="text"
          type="text"
          placeholder="Type Message"
          onChange={(e) => setChatInput(e.target.value)}
        />
        <button className="button" onClick={handleChatSubmit}>
          <Send />
        </button>
      </div>
    </div>
  );
};

export default TextContainer;
