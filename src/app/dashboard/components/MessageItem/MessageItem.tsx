import React from 'react';
import styles from './MessageItem.module.scss';
import { Message } from '@/types/interfaces';

const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div className={styles.messageContainer}>
      <div className={styles.senderName}>{message.senderName}</div>
      <div className={styles.message}>
        <p>{message.content}</p>
      </div>
    </div>
  );
};

export default MessageItem;
