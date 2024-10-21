import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message, User } from '@/types/interfaces';
import useMessages from './useMessages';

const useSocket = (chatId: number | null, currUser: User) => {
  const { addMessageToCache, updateMessageInCache, removeMessageFromCache } =
    useMessages(chatId);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!chatId) return;

    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      withCredentials: true,
    });

    socketInstance.emit('joinRoom', { chatId });

    socketInstance.on(
      'receiveMessage',
      (message: Message & { tempId?: number }) => {
        if (message.chatId === chatId) {
          if (message.tempId) {
            updateMessageInCache(message.tempId, message);
          } else {
            addMessageToCache(message);
          }
        }
      }
    );

    socketInstance.on('messageError', ({ tempId }: { tempId: number }) => {
      removeMessageFromCache(tempId);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  const sendMessage = (chatId: number, content: string) => {
    if (socket) {
      const tempId = Date.now();

      const optimisticMessage: Message = {
        id: tempId,
        senderId: currUser.id,
        chatId,
        senderName: currUser.displayName,
        content,
      };

      addMessageToCache(optimisticMessage);

      socket.emit('sendMessage', { chatId, content, tempId });
    }
  };

  return { socket, sendMessage };
};

export default useSocket;
