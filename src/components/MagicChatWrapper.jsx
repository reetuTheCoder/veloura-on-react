import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import useMagicChat from '../hooks/useMagicChat';

const MagicChatWrapper = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const magicChat = useMagicChat(isAuthenticated ? user : null);

  // Handle user login/logout for MagicChat
  useEffect(() => {
    const handleLogout = () => {
      if (window.magicchat_io?.logout) {
        window.magicchat_io.logout();
      }
    };

    // Listen for logout events
    window.addEventListener('beforeunload', handleLogout);

    return () => {
      window.removeEventListener('beforeunload', handleLogout);
    };
  }, []);

  return <>{children}</>;
};

export default MagicChatWrapper;
