import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import ChatModal from "../Modal/ChatModal";
import styled from "styled-components";

const ChatRoom = ({
  sender,
  receiver,
  roomId,
  chatList,
  isOpen,
  onClose,
  setIsOpen,
}) => {
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(chatList || []);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (isOpen) {
      connect();
    } else if (stompClient) {
      disconnect();
    }

    return () => {
      if (stompClient) {
        disconnect();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    // props로 전달받은 chatList를 chatMessages state에 설정
    const sortedMessages = [...(chatList || [])].sort((a, b) => {
      return new Date(a.sendDate) - new Date(b.sendDate);
    });
    setChatMessages(sortedMessages);
  }, [chatList]);

  const connect = () => {
    if (stompClient) {
      disconnect(); // 기존의 연결 및 구독을 종료
    }

    const socket = new SockJS(
      `http://${process.env.REACT_APP_SERVER_IP}/ws-stomp`
    );
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      setStompClient(client);

      client.subscribe(`/room/${roomId}`, (chatMessage) => {
        const receivedMessage = JSON.parse(chatMessage.body);
        addMessage(
          receivedMessage.sender,
          receivedMessage.message,
          receivedMessage.sendDate
        );
      });
    };

    client.activate();
  };

  const disconnect = () => {
    if (stompClient) {
      stompClient.deactivate();
    }
    setStompClient(null);
  };

  const addMessage = (sender, messageContent, sendDate) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender, message: messageContent, sendDate },
    ]);
  };

  const sendChat = () => {
    if (message.trim() !== "") {
      const now = new Date();
      stompClient.publish({
        destination: `/send/${roomId}`,
        body: JSON.stringify({
          sender: sender,
          message: message,
          sendDate: now.toISOString(), // 현재 시간을 그대로 사용
        }),
      });
      setMessage("");
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <ChatModal setIsOpen={setIsOpen} isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <UserName>{receiver}님과의 채팅방</UserName>
        <ChatContainer ref={chatContainerRef}>
          {chatMessages.map((msg, index) => (
            <MessageWrapper key={index} isMine={msg.sender === sender}>
              <ChatWrapper isMine={msg.sender === sender}>
                <Bubble isMine={msg.sender === sender}>{msg.message}</Bubble>
                <Timestamp>
                  {new Date(msg.sendDate).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "Asia/Seoul",
                  })}
                </Timestamp>
              </ChatWrapper>
            </MessageWrapper>
          ))}
        </ChatContainer>
        <InputContainer>
          <Input type="text" value={message} onChange={handleMessageChange} />
          <SendButton onClick={sendChat}>전송</SendButton>
        </InputContainer>
      </Wrapper>
    </ChatModal>
  );
};
const ChatContainer = styled.div`
  min-height: 450px; /* 조절하여 적절한 높이로 설정합니다. */
  max-height: 450px;
  width: 400px;
  overflow-y: auto;
  padding: 10px;
  padding-top: 40px;
  padding-bottom: 20px; /* 입력창 높이에 따라 조절 가능합니다. */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  padding: 10px;
  background-color: #ffffff;
`;

const MessageWrapper = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
`;

const UserName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Bubble = styled.div`
  max-width: 250px;
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  background-color: ${(props) => (props.isMine ? "#ff2559" : "#eee")};
  border-radius: ${(props) =>
    props.isMine ? "10px 0px 10px 10px" : "0px 10px 10px 10px"};
  color: ${(props) => (props.isMine ? "white" : "black")};
`;

const Timestamp = styled.span`
  font-size: 0.8em;
  margin-left: 10px;
  margin-right: 10px;
`;

const Input = styled.input`
  font-family: "NanumSquareRoundBold";
  border-radius: 10px;
  border: 2px solid #e9e9e9;
  padding: 10px;
  width: 320px;
`;

const SendButton = styled.button`
  color: white;
  border: none;
  border-radius: 10px;
  padding: 11px;
  background-color: #ff2556;
`;

const ChatWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: ${(props) => (props.isMine ? "row-reverse" : "row")};
`;

export default ChatRoom;
