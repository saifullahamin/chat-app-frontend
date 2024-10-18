'use client';

import React from 'react';
import MessageList from '../MessageList';
import styles from './Chat.module.scss';
import { SelectedChat, SelectedUser, User } from '@/types/interfaces';
import useSendMessage from '@/hooks/useSendMessage';
import useSocket from '@/hooks/useSocket';

interface ChatProps {
  selectedChat: SelectedChat | null;
  selectedUser: SelectedUser | null;
  currUser: User;
}

const Chat: React.FC<ChatProps> = ({
  selectedChat,
  selectedUser,
  currUser,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(selectedChat!.id);
    }
  };
  const { sendMessage } = useSocket(
    selectedChat ? selectedChat.id : null,
    currUser
  );

  const { messageContent, setMessageContent, handleSendMessage } =
    useSendMessage(sendMessage);

  return (
    <div className={styles.chatContainer}>
      {selectedUser ? (
        <>
          <div className={styles.chatHeader}>
            <h2>Conversation with {selectedUser.name}</h2>
          </div>
          <MessageList selectedChat={selectedChat} />
          <div className={styles.chatInput}>
            <input
              type='text'
              placeholder='Type your message...'
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={() => handleSendMessage(selectedChat!.id)}>
              Send
            </button>
          </div>
        </>
      ) : (
        <div className={styles.noConversation}>
          <p>Select a user to start a conversation</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
