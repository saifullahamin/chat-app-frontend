"use client";

import { useState } from "react";
import Sidebar from "../Sidebar";
import Chat from "../Chat";
import { SelectedChat, SelectedUser, User } from "@/types/interfaces";

interface DashboardProps {
  users: Array<{ id: number; displayName: string }>;
  currUser: User;
}

const Dashboard: React.FC<DashboardProps> = ({ users, currUser }) => {
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);

  return (
    <>
      <Sidebar
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setSelectedChat={setSelectedChat}
        currUser={currUser}
      />
      <Chat
        selectedChat={selectedChat}
        selectedUser={selectedUser}
        currUser={currUser}
      />
    </>
  );
};

export default Dashboard;
