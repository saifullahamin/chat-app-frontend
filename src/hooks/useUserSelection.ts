import { useState } from 'react';
import apiFetch from '@/services/apiClient';
import { SelectedChat, SelectedUser, User } from '@/types/interfaces';

const useUserSelection = (
  setSelectedChat: (chat: SelectedChat) => void,
  setSelectedUser: (user: SelectedUser) => void,
  currUser: User
) => {
  const [activeUserId, setActiveUserId] = useState<number | null>(null);

  const handleUserSelect = async (userId: number, displayName: string) => {
    setSelectedUser({ name: displayName });
    setActiveUserId(userId);

    try {
      const response = await apiFetch('/chat/get-or-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currUser.id,
          selectedUserId: userId,
        }),
      });

      const chatId = response.chatId;
      setSelectedChat({ id: chatId });
    } catch (error) {
      console.error('Error fetching or creating chat:', error);
    }
  };

  return { handleUserSelect, activeUserId };
};

export default useUserSelection;
