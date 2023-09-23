import React, { useState, useEffect, useRef } from "react";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import axios from "axios";
import { getJWTCookie } from "../Api/loginApi";
import styled from 'styled-components';
import sendIcon from "../../Img/submitImage.png"
import closeButton from "../../Img/closeIcon.png";

const Chat = ({userId, targetId, onClose, isChatOpen}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [roomId, setRoomId] = useState("");

  const stompClientRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
}, [messages]);

  const closeModal = () => {
    onClose();
  };

  const authToken = getJWTCookie("jwtAccessToken");
  const API = `http://${process.env.REACT_APP_SERVER_IP}/finalMatch/personalChat`;

  useEffect(() => {
    const getRoomData = async () => {
      try {
        const response = await axios.post(API, {
          userId: userId,
          anotherUserId: targetId
        }, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        
        setRoomId(response.data.chatRoomId);
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
        window.alert("채팅 데이터들을 가져오지 못했습니다.");
      }
    }
  
    getRoomData();
  }, [userId, targetId, authToken, API]);
  
  useEffect(() => {
    axios.post(API, {
      userId: userId,
      anotherUserId: targetId
    },{
      headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {
      setRoomId(response.data.chatRoomId);
      setMessages(response.data.messages);
    }).catch((error) => {
      console.log(error);
      window.alert("채팅 데이터들을 가져오지 못했습니다.");
    });

    const socket = new SockJS(`http://${process.env.REACT_APP_SERVER_IP}/chatting`);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, function () {
      const entranceMessage = {
        senderId: 'system',
        content: `${userId}님이 입장하셨습니다.`,
      };
      stompClient.send("/topic/" + roomId, {}, JSON.stringify(entranceMessage));

      stompClient.subscribe('/topic/' + roomId, function (e) { 
        
      });
    });

    return () => {
      if (stompClient.connected) {
        const exitMessage = {
          senderId: 'system',
          content: `${userId}님이 나가셨습니다.`,
        };
        stompClient.send("/topic/" + roomId, {}, JSON.stringify(exitMessage));
        stompClient.disconnect();
      }
    };
    }, []);

    useEffect(() => {
      if (!roomId) return; 
    
      const socket = new SockJS(`http://${process.env.REACT_APP_SERVER_IP}/chatting`);
      const stompClient = Stomp.over(socket);
      stompClientRef.current = stompClient;
    
      stompClient.connect({}, function () {
        const entranceMessage = {
          senderId: 'system',
          content: `${userId}님이 입장하셨습니다.`,
        };
        stompClient.send("/topic/" + roomId, {}, JSON.stringify(entranceMessage));
    
        stompClient.subscribe('/topic/' + roomId, function (e) { 
          console.log(e.body);
        if(e.body.toString() === "notice") {
        } else {
          const receivedMessage = JSON.parse(e.body.toString());
          if (receivedMessage.senderId !== userId) {
            setMessages(prevMessages => [...prevMessages, receivedMessage]);
          }
        }
        });
      });
    
      return () => {
        if (stompClient.connected) {
          const exitMessage = {
            senderId: 'system',
            content: `${userId}님이 나가셨습니다.`,
          };
          stompClient.send("/topic/" + roomId, {}, JSON.stringify(exitMessage));
          stompClient.disconnect();
        }
      };
    }, [roomId]);
    

    const handleSendMessage = (e) => {
      e.preventDefault(); // 이 부분 추가: 폼 전송 방지
      if (!newMessage.trim()) return;
    
      if (stompClientRef.current) {
        const sentMessage = {
          senderId: userId,
          content: newMessage,
          timestamp: new Date()
        };
    
        stompClientRef.current.send("/topic/" + roomId, {}, JSON.stringify(sentMessage));
        setMessages(prevMessages => [...prevMessages, sentMessage]);
        setNewMessage("");  // 메시지 전송 후 입력창 비우기
      } else {
        console.log("error");
      }
    };
    
    
    const Timestamp = styled.div.attrs(props => ({
      children: new Date(props.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) 
    }))`
      font-size: 0.85em;
      color: #888;
      margin-left: 10px;
      margin-right: 10px;
      margin-top: 10px;

    `;


return (
  <>
      {isChatOpen && (
          <ModalBackground onClick={closeModal}>
              <ChatModalContainer onClick={e => e.stopPropagation()}>
                    <CloseButton>
                      <CloseImage src={closeButton} onClick={closeModal}/>
                    </CloseButton>
                  <ChatContainer ref={chatContainerRef}>
                  {messages.map((message, idx) => {
                      const prevMessage = messages[idx - 1];
                      const nextMessage = messages[idx + 1];

                      const isSameTimestampWithPrev = prevMessage && new Date(message.timestamp).toLocaleTimeString() === new Date(prevMessage.timestamp).toLocaleTimeString();
                      const isSameTimestampWithNext = nextMessage && new Date(message.timestamp).toLocaleTimeString() === new Date(nextMessage.timestamp).toLocaleTimeString();

                      const shouldDisplayTimestamp = !isSameTimestampWithPrev && !isSameTimestampWithNext;

                      if (message.senderId === 'system') {
                          return <SystemMessageWrapper key={idx}><SystemMessage>{message.content}</SystemMessage></SystemMessageWrapper>;
                      }
                      return (
                        <ChatBubbleWrapper>
                        <SenderName ownMessage={message.senderId === userId}>
                            {message.senderId === userId ? "" : targetId}
                        </SenderName>
                        <ChatBubble key={idx} ownMessage={message.senderId === userId}>
                            {shouldDisplayTimestamp && <Timestamp time={message.timestamp}></Timestamp>}
                            {message.senderId === userId ? 
                                <MyMessage>{message.content}</MyMessage> : 
                                <OtherMessage>{message.content}</OtherMessage>
                            }
                        </ChatBubble>
                    </ChatBubbleWrapper>
                      );
                  })}
                  </ChatContainer>


                  <InputContainer onSubmit={handleSendMessage}>
                    <MessageInput
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage(e)}
                    />
                    <SendButton type="submit" onClick={handleSendMessage}>
                        <Image src={sendIcon} />
                    </SendButton>
                </InputContainer>
              </ChatModalContainer>
          </ModalBackground>
      )}
  </>
);
}

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ChatModalContainer = styled.div`
    background-color: #fff;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    min-width: 30%;
    max-width: 80%;
    min-height: 40rem;
    overflow: auto;
    position: relative;
`;


const SenderName = styled.div`
    font-weight: 500;
    margin-bottom: 5px;
    align-self: ${props => props.ownMessage ? "flex-end" : "flex-start"};
`;


const ChatContainer = styled.div`
    padding-top: 30px;
    background: #ffffff;
    overflow: auto;
    min-height: 35rem;
    max-height: 35rem;
    font-family: 'Arial', sans-serif;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const MyMessage = styled.div`
    background: #ff2559;
    color: #fff;
    padding: 10px 15px;
    border-radius: 15px 15px 0 15px;
    display: inline-block;
    margin-bottom: 10px;
    align-self: flex-end;
`;

const OtherMessage = styled.div`
    background: linear-gradient(45deg, #D4D4D4, #F0F0F0);
    color: #333;
    padding: 10px 15px;
    border-radius: 15px 15px 15px 0;
    display: inline-block;
    margin-bottom: 10px;
    align-self: flex-start;
`;

const ChatBubble = styled.div`
    max-width: 70%;
    align-self: ${props => props.ownMessage ? "flex-end" : "flex-start"};
    display: flex;
    flex-direction: ${props => props.ownMessage ? "row" : "row-reverse"};
    justify-content: flex-end; 
    align-items: center;  
`;


const MessageInput = styled.input`
    font-family: 'Arial', sans-serif;
    width: 100%;
    padding: 12px 15px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border: 2px solid #d9d9d9;  
    font-size: 16px;
    outline: none;

`;
const SendButton = styled.button`
    background-color: #ff2559;
    color: #fff;
    padding: 16px;
    height: 52px;
    border: none;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SystemMessage = styled.div`
  color: #ff2559;
  text-align: center;
  width: 100%;
  font-weight: 700;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    margin-left: 5px;
`;

const CloseImage = styled.img`
    width: 1rem;
    height: 1rem;
    margin-left: 5px;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const SystemMessageWrapper = styled.div`
    display: flex;
`

const CloseButton = styled.div`
    display: flex;
    justify-content: flex-end;
    cursor: pointer;

`

const ChatBubbleWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export default Chat;
