import React, { useEffect, useState, useRef } from 'react';
import { Message } from '../../types';
import MessageComponent from './Message';
import MessageInput from './MessageInput';
import { io, Socket } from 'socket.io-client';
import styles from './ChatStyles.module.scss';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000'); // Adjust URL as needed

    socketRef.current.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const sendMessage = (text: string) => {
    const message: Message = {
      id: Date.now(),
      text,
      sender: 'You', // Replace with actual user
      timestamp: new Date(),
    };
    socketRef.current?.emit('message', message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.messages}>
        {messages.map((msg) => (
          <MessageComponent key={msg.id} message={msg} />
        ))}
      </div>
      <MessageInput onSend={sendMessage} />
    </div>
  );
};

export default ChatWindow;
