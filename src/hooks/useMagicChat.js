import { useEffect, useRef } from 'react';
import magicChatService from '../services/magicChat';

export const useMagicChat = (user) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    const initChat = async () => {
      // Prevent multiple initializations
      if (initializedRef.current) return;
      
      try {
        if (user) {
          await magicChatService.initializeWithUser(user);
        } else {
          await magicChatService.initialize();
        }
        initializedRef.current = true;
      } catch (error) {
        console.error('Failed to initialize MagicChat:', error);
      }
    };

    initChat();

    // Cleanup on unmount
    return () => {
      // Don't logout on unmount, just clean up
    };
  }, [user]);

  // Return the service for any additional operations
  return magicChatService;
};

export default useMagicChat;
