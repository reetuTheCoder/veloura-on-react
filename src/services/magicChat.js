import API_CONFIG from '../config';

class MagicChatService {
  constructor() {
    this.initialized = false;
    this.socket = null;
  }

  // Load the MagicChat script dynamically
  loadScript() {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      if (document.querySelector('script[src*="bundle.js"]')) {
        resolve();
        return;
      }

      // Load Socket.io first
      const socketScript = document.createElement('script');
      socketScript.src = 'https://cdn.socket.io/4.1.2/socket.io.min.js';
      socketScript.async = true;
      document.head.appendChild(socketScript);

      // Load MagicChat bundle
      const script = document.createElement('script');
      script.src = 'https://magicchat-core.github.io/dev-ssc-client-cdns/bundle.js';
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Initialize MagicChat
  async initialize(userId = null) {
    try {
      // Load the script if not loaded
      await this.loadScript();

      // Wait for window.sageion_os to be available
      await this.waitForMagicChat();

      // Set up the chat
      await window.sageion_os.setUp(
        API_CONFIG.APP_NAME,
        API_CONFIG.API_KEY,
        API_CONFIG.REGION,
        API_CONFIG.APP_VERSION,
        false,
        API_CONFIG.ROOT_SAGEION_ID || null
      );

      // Initialize with user ID if provided
      if (userId) {
        await window.sageion_os.initialize({ uid: userId.toString() });
      } else {
        await window.sageion_os.initialize();
      }

      this.initialized = true;
      console.log('✅ MagicChat initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize MagicChat:', error);
      return false;
    }
  }

  // Wait for window.sageion_os to be available
  waitForMagicChat(timeout = 10000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const checkInterval = setInterval(() => {
        if (window.sageion_os) {
          clearInterval(checkInterval);
          resolve();
        } else if (Date.now() - startTime > timeout) {
          clearInterval(checkInterval);
          reject(new Error('MagicChat initialization timeout'));
        }
      }, 100);
    });
  }

  // Initialize with user data from authentication
  async initializeWithUser(user) {
    if (user && user.id) {
      return this.initialize(user.id);
    }
    return this.initialize();
  }

  // Logout user from chat
  logout() {
    if (window.sageion_os?.logout) {
      window.sageion_os.logout();
      console.log('✅ MagicChat logout successful');
    }
  }

  // Check if MagicChat is initialized
  isInitialized() {
    return this.initialized && window.sageion_os;
  }
}

// Create a singleton instance
const magicChatService = new MagicChatService();
export default magicChatService;
