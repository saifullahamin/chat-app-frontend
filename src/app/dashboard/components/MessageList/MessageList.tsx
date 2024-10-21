"use client";

import React, { useEffect, useRef } from "react";
import MessageItem from "../MessageItem";
import styles from "./MessageList.module.scss";
import { SelectedChat, Message } from "@/types/interfaces";
import useMessages from "@/app/dashboard/hooks/useMessages";

export interface MessageListProps {
  selectedChat: SelectedChat | null;
}

const MessageList: React.FC<MessageListProps> = ({ selectedChat }) => {
  const messageListRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading } = useMessages(
    selectedChat ? selectedChat.id : null
  );
  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isLoading || !messages) {
    return;
  }
  return (
    <div className={styles.messageList} ref={messageListRef}>
      {messages
        .filter((message: Message) => message.chatId === selectedChat!.id)
        .map((message: Message, index: number) => (
          <MessageItem key={index} message={message} />
        ))}
    </div>
  );
};

export default MessageList;
