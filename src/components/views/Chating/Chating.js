import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const Chat = ({ user, chatRoomId }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS(`http://${process.env.REACT_APP_SERVER_IP}/ws`); // Replace with your WebSocket endpoint
    const stomp = Stomp.over(socket);
    
    stomp.connect({}, () => {
      stomp.subscribe(`/topic/${chatRoomId}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, receivedMessage]);
      });
    });

    setStompClient(stomp);

    return () => {
      if (stomp) {
        stomp.disconnect();
      }
    };
  }, [chatRoomId]);

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        senderId: user.id,
        senderName: user.name,
        message: messageInput,
      };

      stompClient.send('/app/chat/send', {}, JSON.stringify(newMessage));

      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.senderName}:</strong> {message.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
