import { useEffect, useState } from 'react';

export const useChatbot = () => {
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if magicchat_io is available
    const checkReady = setInterval(() => {
      if (window.sageion_os) {
        setIsReady(true);
        clearInterval(checkReady);
      }
    }, 500);

    return () => clearInterval(checkReady);
  }, []);

  const openChat = () => {
    if (window.sageion_os?.open) {
      window.sageion_os.open();
      setIsOpen(true);
    } else {
      console.warn('Chatbot not ready');
    }
  };

  const closeChat = () => {
    if (window.sageion_os?.close) {
      window.sageion_os.close();
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
