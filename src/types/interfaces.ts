export interface User {
  id: number;
  displayName: string;
}

export interface Message {
  id?: number;
  senderId: number;
  chatId: number;
  content: string;
  senderName: string;
}

export interface SelectedUser {
  name: string;
}

export interface SelectedChat {
  id: number | null;
}
