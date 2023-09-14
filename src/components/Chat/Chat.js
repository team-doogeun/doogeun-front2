import React, { useState, useEffect } from "react";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import StompJS from '@stomp/stompjs';
import axios from "axios";
import { getJWTCookie } from "../Api/loginApi";
import "./Chat.css";
import styled from 'styled-components';


const Chat = ({userId, targetId, roomId, onClose, isChatOpen}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const closeModal = () => {
    onClose();  // 부모 컴포넌트에게 모달이 닫힘을 알림
  };

  let socket = new SockJS(`http://${process.env.REACT_APP_SERVER_IP}/chatting`);
  const stompClient = Stomp.over(socket);
  const authToken = getJWTCookie("jwtAuthToken");

  const API = `http://${process.env.REACT_APP_SERVER_IP}/finalMatch/personalChat`;
  
  useEffect(() => {
    console.log(userId);
    console.log(targetId);

    axios.post(API, {
      userId: userId,
      anotherUserId: targetId
    },
    {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {
      console.log(response);
      setMessages(response.data.messages); 
    }).catch((error) => {
      console.log(error);
      window.alert("채팅 데이터들을 가져오지 못했습니다.");
    });

    stompClient.connect({}, function () {
      stompClient.subscribe('/topic/' + roomId, function (e) { 
        if(e.body.toString() === "notice") {
          // 아무 동작도 수행하지 않습니다.
        } else {
          const receivedMessage = JSON.parse(e.body.toString()); // 서버에서 메시지의 형식을 JSON으로 보낸다고 가정

          // 자신의 userId와 메시지의 senderId가 일치하는 경우 메시지를 다시 표시하지 않습니다.
          if (receivedMessage.senderId !== userId) {
            setMessages(prevMessages => [...prevMessages, receivedMessage]);
          }
        }
      });
    });

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (stompClient) {
      const sentMessage = {
        senderId: userId,
        content: newMessage
      };
      
      // 메시지 객체를 JSON 문자열로 변환하여 보냅니다.
      stompClient.send("/topic/" + roomId, {}, JSON.stringify(sentMessage));
      setMessages(prevMessages => [...prevMessages, sentMessage]);
      setNewMessage("");
    }
    else {
      console.log("error");
    }
};


  return (
    <>
        {isChatOpen && (
            <ModalBackground onClick={closeModal}>
                <ChatModalContainer onClick={e => e.stopPropagation()}>
                    <CloseButton onClick={closeModal}>&times;</CloseButton>

                    <div className="chat-container">
                        {messages.map((message, idx) => (
                            <div
                                key={idx}
                                className={message.senderId === userId ? 'my-message' : 'other-message'}>
                                {message.content}
                            </div>
                        ))}
                    </div>

                    <div>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>

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
    padding: 20px;
    border-radius: 10px;
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
    position: relative;
`;

const CloseButton = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;


export default Chat;
