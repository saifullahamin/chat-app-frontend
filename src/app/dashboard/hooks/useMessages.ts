import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Message } from '@/types/interfaces';
import apiFetch from '@/services/apiClient';

const useMessages = (chatId: number | null) => {
  const queryClient = useQueryClient();

  const { data: previousMessages, isLoading } = useQuery({
    queryKey: ['previousMessages', chatId],
    queryFn: async () => {
      if (chatId) {
        const response = await apiFetch(`/messages/${chatId}`);
        return response;
      }
      return [];
    },
    enabled: !!chatId,
  });

  const addMessageToCache = (message: Message) => {
    queryClient.setQueryData<Message[]>(
      ['previousMessages', chatId],
      (oldMessages = []) => [...oldMessages, message]
    );
  };

  const updateMessageInCache = (tempId: number, confirmedMessage: Message) => {
    queryClient.setQueryData<Message[]>(
      ['previousMessages', chatId],
      (oldMessages = []) => {
        return oldMessages.map((msg) =>
          msg.id === tempId ? confirmedMessage : msg
        );
      }
    );
  };

  const removeMessageFromCache = (tempId: number) => {
    queryClient.setQueryData<Message[]>(
      ['previousMessages', chatId],
      (oldMessages = []) => oldMessages.filter((msg) => msg.id !== tempId)
    );
  };

  return {
    messages: previousMessages,
    addMessageToCache,
    isLoading,
    updateMessageInCache,
    removeMessageFromCache,
  };
};

export default useMessages;
