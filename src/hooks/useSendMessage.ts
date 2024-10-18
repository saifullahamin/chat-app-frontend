import { useState } from 'react';

const useSendMessage = (
  sendMessage: (chatId: number, message: string) => void
) => {
  const [messageContent, setMessageContent] = useState('');

  const handleSendMessage = (chatId: number | null) => {
    if (chatId && messageContent.trim()) {
      sendMessage(chatId, messageContent.trim());
      setMessageContent('');
    }
  };

  return {
    messageContent,
    setMessageContent,
    handleSendMessage,
  };
};

export default useSendMessage;
