import React from 'react';
import { User, SelectedChat, SelectedUser } from '@/types/interfaces';
import styles from './Sidebar.module.scss';
import useUserSelection from '@/hooks/useUserSelection';
import useLogout from '@/hooks/useLogout';

interface SidebarProps {
  users: User[];
  selectedUser: SelectedUser | null;
  setSelectedChat: (chat: SelectedChat) => void;
  setSelectedUser: (user: SelectedUser) => void;
  currUser: User;
}

const Sidebar: React.FC<SidebarProps> = ({
  users,
  setSelectedChat,
  setSelectedUser,
  currUser,
}) => {
  const { handleLogout } = useLogout();
  const { handleUserSelect, activeUserId } = useUserSelection(
    setSelectedChat,
    setSelectedUser,
    currUser!
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.userList}>
        <h4 className={styles.currentUser}>Welcome, {currUser!.displayName}</h4>
        <h3 className={styles.heading}>Direct Messages</h3>
        <ul>
          {users
            .filter((user) => user.id.toString() !== currUser!.id?.toString())
            .map((user) => (
              <li
                key={user.id}
                className={`${styles.userItem} ${
                  activeUserId === user.id ? styles.selected : ''
                }`}
                onClick={() => handleUserSelect(user.id, user.displayName)}
              >
                <button>{user.displayName}</button>
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.logoutButtonContainer}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
