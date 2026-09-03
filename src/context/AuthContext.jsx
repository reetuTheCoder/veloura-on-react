import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import magicChatService from '../services/magicChat';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      // Initialize MagicChat without user
      initializeMagicChat(null);
      setLoading(false);
    }
  }, [token]);

  const initializeMagicChat = async (userData) => {
    try {
      if (userData && userData.id) {
        await magicChatService.initializeWithUser(userData);
      } else {
        await magicChatService.initialize();
      }
    } catch (error) {
      console.error('Failed to initialize MagicChat:', error);
    }
  };

  const loadUser = async () => {
    try {
      const response = await api.get('/auth/profile');
      const userData = response.data;
      setUser(userData);
      // Initialize MagicChat with user
      await initializeMagicChat(userData);
    } catch (error) {
      console.error('Failed to load user:', error);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      // Initialize MagicChat without user
      await initializeMagicChat(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      // Initialize MagicChat with logged-in user
      await initializeMagicChat(user);
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed',
      };
    }
  };

  const register = async (email, password, full_name) => {
    try {
      const response = await api.post('/auth/register', { email, password, full_name });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      // Initialize MagicChat with registered user
      await initializeMagicChat(user);
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed',
      };
    }
  };

  const logout = () => {
    // Logout from MagicChat
    magicChatService.logout();
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    
    // Re-initialize MagicChat without user
    setTimeout(async () => {
      await initializeMagicChat(null);
    }, 100);
  };

  const value = {
    user,
    loading,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
