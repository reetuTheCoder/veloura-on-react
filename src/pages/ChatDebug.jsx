import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import magicChatService from '../services/magicChat';

const ChatDebug = () => {
  const { user, isAuthenticated } = useAuth();
  const [status, setStatus] = useState('Checking...');
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const isInit = magicChatService.isInitialized();
      const hasMagicChat = !!window.sageion_os;
      setStatus(`
        MagicChat Initialized: ${isInit ? '✅ Yes' : '❌ No'}
        window.sageion_os exists: ${hasMagicChat ? '✅ Yes' : '❌ No'}
        User authenticated: ${isAuthenticated ? '✅ Yes' : '❌ No'}
        User ID: ${user?.id || 'Not logged in'}
      `);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const reinitialize = async () => {
    setLoading(true);
    try {
      if (user && user.id) {
        await magicChatService.initializeWithUser(user);
      } else {
        await magicChatService.initialize();
      }
      setStatus('✅ Reinitialized successfully!');
    } catch (error) {
      setStatus(`❌ Failed to reinitialize: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '100px 40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>MagicChat Debug</h1>
      
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Status</h3>
        <pre style={{ whiteSpace: 'pre-wrap', background: 'white', padding: '15px', borderRadius: '4px' }}>
          {status}
        </pre>
      </div>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <button 
          onClick={checkStatus} 
          disabled={loading}
          style={{ padding: '10px 20px', background: '#1a1a1a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Check Status
        </button>
        <button 
          onClick={reinitialize} 
          disabled={loading}
          style={{ padding: '10px 20px', background: '#b89b6b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Reinitialize
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
        <h3>User Info</h3>
        <pre style={{ background: 'white', padding: '15px', borderRadius: '4px' }}>
          {user ? JSON.stringify(user, null, 2) : 'Not logged in'}
        </pre>
      </div>
    </div>
  );
};

export default ChatDebug;
