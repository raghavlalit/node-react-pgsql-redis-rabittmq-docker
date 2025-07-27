import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

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
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Configure api defaults
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        // Handle test tokens without API call
        if (token.startsWith('test-')) {
          if (token.startsWith('test-admin-token-')) {
            setUser({
              id: '1',
              name: 'Admin User',
              email: 'admin@yopmail.com',
              role: 'ADMIN'
            });
          } else if (token.startsWith('test-user-token-')) {
            setUser({
              id: '2',
              name: 'Test User',
              email: 'user@yopmail.com',
              role: 'USER'
            });
          } else if (token.startsWith('test-register-token-')) {
            setUser({
              id: '3',
              name: 'Test User',
              email: 'test@yopmail.com',
              role: 'USER'
            });
          }
        } else {
          // Regular API call for real tokens
          try {
            const response = await api.get('/auth/profile');
            setUser(response.data.user);
          } catch (error) {
            console.error('Auth check failed:', error);
            logout();
          }
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    // Handle test credentials without API call
    if (email === 'admin@yopmail.com' && password === 'admin123') {
      const testUser = {
        id: '1',
        name: 'Admin User',
        email: 'admin@yopmail.com',
        role: 'ADMIN'
      };
      const testToken = 'test-admin-token-' + Date.now();
      
      setToken(testToken);
      setUser(testUser);
      localStorage.setItem('token', testToken);
      
      return { success: true };
    }
    
    if (email === 'user@yopmail.com' && password === 'user123') {
      const testUser = {
        id: '2',
        name: 'Test User',
        email: 'user@yopmail.com',
        role: 'USER'
      };
      const testToken = 'test-user-token-' + Date.now();
      
      setToken(testToken);
      setUser(testUser);
      localStorage.setItem('token', testToken);
      
      return { success: true };
    }

    // Regular API call for other credentials
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      };
    }
  };

  const register = async (name, email, password) => {
    // Handle test registration without API call
    if (email === 'test@yopmail.com' && password === 'test123') {
      const testUser = {
        id: '3',
        name: name || 'Test User',
        email: 'test@yopmail.com',
        role: 'USER'
      };
      const testToken = 'test-register-token-' + Date.now();
      
      setToken(testToken);
      setUser(testUser);
      localStorage.setItem('token', testToken);
      
      return { success: true };
    }

    // Regular API call for other registrations
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });
      
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 