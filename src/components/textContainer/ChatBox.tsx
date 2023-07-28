import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import './TextContainer.css';
import { Delete, DoorOpen, Offline, Online, RemoveUser, Send } from '../../icons';
import { ThemeContext } from '../../context/ThemeContext';
import { THEMEDARK, THEMELIGHT } from '../utils/styles';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);
  const [token, setToken] = useState(null);
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [statusOnline, setStatusOnline] = useState("CONNECTING");
  const [isUserID, setIsUserID] = useState(null);

  const [isModerator, setIsModerator] = useState<boolean>(false);

  const [username, setUsername] = useState<string | null>(null);
  const messagesEndRef = useRef(null);
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    return null; // Handle when the context is not yet available
  }
  const { theme } = themeContext;

  const fetchToken = async () => {
    try {
      if (isModerator) {
        const response =  await axios.get(`http://localhost:5000/gentokenmod`);
      
        const data = response.data;
        setToken(data.token);
        setIsUserID(data.UserId)
        console.log('mod entered the chat')
      }
      else {
        const response = await axios.get(`http://localhost:5000/gentoken`);
        const data = response.data;
        setToken(data.token);
        setIsUserID(data.UserId)

        console.log('user entered the chat')

      }
    } catch (error) {

    }
  };




  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let newSocket = null;

    if (token && isUsernameSet) {
      newSocket = new WebSocket(
        'wss://edge.ivschat.ap-south-1.amazonaws.com',
        token
      );

      newSocket.addEventListener('open', () => {
        setStatusOnline("CONNECTED")

      });


      newSocket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);


        if (message?.EventName === "aws:DELETE_MESSAGE") {
          setMessages((prevMessages) => prevMessages.filter(msg => msg.Id !== message.Attributes
            .MessageID
          ));
        }
        else if (message?.EventName === "aws:DISCONNECT_USER" && message.Attributes.UserId == isUserID) {

          alert("You have been disconnected")

        }

        else {
          setMessages((prevMessages):any => [...prevMessages, message]);
        }

        // Handle the received message and update the chat UI

      });

      newSocket.addEventListener('close', () => {
        setStatusOnline("DISCONNECTED")

      });
      setSocket(newSocket);
    }
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [token, isUsernameSet,isUserID]);

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [isUsernameSet]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }

    const message = {
      action: 'SEND_MESSAGE',
      content: inputValue,
      attributes: {
        username: username,
      },
    };

    socket.send(JSON.stringify(message));

    setInputValue('');
  };

  const handleDeleteMessage = (id) => {

    const deletePayload = {
      action: "DELETE_MESSAGE",
      reason: "Deleted by moderator",
      id: id
    }
    socket.send(JSON.stringify(deletePayload));
  }
  const handleDisconnetUser = (id) => {

    const disconnectUser = {
      action: "DISCONNECT_USER",
      reason: "disconnected by moderator",
      userId: id,

    }
    socket.send(JSON.stringify(disconnectUser));
  }


  const SenderChat = ({ name, chatText, id, userID }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'end' }}>
        <div className="sender" >
          <p className="senderChatName">{name}</p>
          <div className="senderChat" style={{ backgroundColor: theme === 'light' ? "#A5D2F9" : THEMEDARK.SearchBackground, color: theme === 'light' ? THEMEDARK.HeaderBackground : '##A5D2F9' }}>
            <p>{chatText} </p>
          </div>
        </div>
        {isModerator && <button style={{ border: 'none', backgroundColor: 'transparent' }} onClick={() => {
          handleDeleteMessage(id)
        }}><Delete /></button>}
        {isModerator && <button style={{ border: 'none', backgroundColor: 'transparent' }} onClick={() => {
          handleDisconnetUser(userID)
        }}><RemoveUser /></button>}
      </div>
    );
  };
  const UserChat = ({ name, chatText, id, userID }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'end', alignSelf: 'flex-end' }}>
        <div className="chatgroup">
          <p>{chatText}</p>
        </div>
        {isModerator && <button style={{ border: 'none', backgroundColor: 'transparent' }} onClick={() => {
          handleDeleteMessage(id)
        }}><Delete /></button>}
        {/* {isModerator && <button style={{ border: 'none', backgroundColor: 'transparent' }} onClick={() => {
          handleDisconnetUser(userID)
        }}><RemoveUser /></button>} */}
      </div>
    );
  };


  return (
    <div className={`containerText  ${theme === 'light' ? 'darkscroll' : 'lightscroll'}`} style={{ backgroundColor: theme === 'light' ? THEMELIGHT.HeaderBackground : THEMEDARK.HeaderBackground, color: theme === 'light' ? THEMEDARK.HeaderBackground : '#fff' }}>
      {isUsernameSet ? (
        <div>
          <div className="text_container" style={{ backgroundColor: theme === 'light' ? THEMELIGHT.HeaderBackground : THEMEDARK.HeaderBackground, color: theme === 'light' ? THEMEDARK.HeaderBackground : '#fff' }}>
            {/* Render the chat messages */}
            {messages.length > 0 &&
              messages.map((msg) => {
                if (msg.Content) {
                  if (msg.Attributes.username === username) {
                    //return user bubble
                    return (
                      <UserChat
                        key={msg.Id}
                        id={msg.Id}
                        userID={msg.Sender.UserId}

                        chatText={msg.Content}
                        name={msg.Attributes.username}
                      />
                    );
                  } else {
                    return (
                      <SenderChat
                        id={msg.Id}
                        key={msg.Id}
                        userID={msg.Sender?.UserId}
                        chatText={msg.Content}
                        name={msg.Attributes.username}
                      />
                    );
                  }
                }


              })}
            <div ref={messagesEndRef} />

          </div>
          <div className="onlineStatus" >{statusOnline==="CONNECTED"?<Online/>:<Offline/>}<p style={{fontSize:'10px'}}>{statusOnline}</p></div>
          <div className="containerFooter" >
            {/* Render the chat input */}

            <p className=" userName">{username && username.at(0)?.toUpperCase()}</p>
            <input
              className="textInput"
              type="text"
              placeholder='Enter Message'
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            <button className="button" onClick={sendMessage}>
              <Send />
            </button>
          </div>

        </div>
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault();
          fetchToken();
          setIsUsernameSet(true);

        }}>
          <div className='userProfile'>
            <h4 style={{ margin: '0' }}>Enter Chat Room</h4>
            <div className="textInput " style={{ backgroundColor: 'transparent' }}>
              <input
                type="text"
                className="text"
                placeholder='Enter Your Name'
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                type='submit'
                className="button"
                onClick={(e) => {
                  e.preventDefault();
                  fetchToken();
                  setIsUsernameSet(true);

                }}
              >
                <DoorOpen />
              </button>
            </div>
            {/* <label htmlFor="modcheck" style={{ paddingRight: '10px' }}>Moderator
            </label>
            <input type='checkbox' id='modcheck'
              onChange={(e) => { e.target.checked ? setIsModerator(true) : setIsModerator(false) }} /> */}
          </div>
        </form>
      )}
    </div>
  );
};

export default ChatBox;
