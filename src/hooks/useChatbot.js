import { useEffect, useState } from 'react';

export const useChatbot = () => {
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if magicchat_io is available
    const checkReady = setInterval(() => {
      if (window.magicchat_io) {
        setIsReady(true);
        clearInterval(checkReady);
      }
    }, 500);

    return () => clearInterval(checkReady);
  }, []);

  const openChat = () => {
    if (window.magicchat_io?.open) {
      window.magicchat_io.open();
      setIsOpen(true);
    } else {
      console.warn('Chatbot not ready');
    }
  };

  const closeChat = () => {
    if (window.magicchat_io?.close) {
      window.magicchat_io.close();
      setIsOpen(false);
    }
  };

  const toggleChat = () => {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  };

  return {
    isReady,
    isOpen,
    openChat,
    closeChat,
    toggleChat,
  };
};

export default useChatbot;
