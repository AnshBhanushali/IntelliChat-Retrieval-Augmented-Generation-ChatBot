import React from 'react';
import { Message as MessageType } from '../../types';
import styles from './ChatStyles.module.scss';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isOwnMessage = message.sender === 'You'; 

  return (
    <div className={isOwnMessage ? styles.ownMessage : styles.otherMessage}>
      <div className={styles.messageContent}>
        <p>{message.text}</p>
        <span>{message.sender}</span>
      </div>
    </div>
  );
};

export default Message;
