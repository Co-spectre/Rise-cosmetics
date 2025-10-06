import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role?: 'user' | 'admin' | 'manager';
  isEmailVerified: boolean;
  createdAt: string;
  lastLogin?: string;
  orderCount?: number;
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    theme: 'light' | 'dark';
    language: string;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  sessionToken: string | null;
  refreshToken: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  refreshSession: () => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  clearError: () => void;
  // Social Login Methods
  loginWithGoogle: () => Promise<boolean>;
  loginWithInstagram: () => Promise<boolean>;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  acceptTerms: boolean;
  newsletter?: boolean;
}

// Action types
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; sessionToken: string; refreshToken: string } }
  | { type: 'AUTH_FAILURE'; payload: { error: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: { user: Partial<User> } }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: { loading: boolean } };

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  sessionToken: null,
  refreshToken: null,
};

// Helper functions for localStorage
const getStoredAuth = () => {
  try {
    const storedAuth = localStorage.getItem('rise_auth');
    return storedAuth ? JSON.parse(storedAuth) : null;
  } catch {
    return null;
  }
};

const storeAuth = (data: { user: User; sessionToken: string; refreshToken: string }) => {
  localStorage.setItem('rise_auth', JSON.stringify(data));
};

const clearStoredAuth = () => {
  localStorage.removeItem('rise_auth');
};

// Password validation
const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  if (password.length < 8) errors.push('Password must be at least 8 characters long');
  if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter');
  if (!/\d/.test(password)) errors.push('Password must contain at least one number');
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  return errors;
};

// Email validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Simulated API calls (replace with real API calls)
const authAPI = {
  async login(email: string, password: string, rememberMe = false): Promise<{ user: User; sessionToken: string; refreshToken: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate authentication
    if (email === 'demo@rise.com' && password === 'Demo123!') {
      const user: User = {
        id: '1',
        email: email,
        name: 'Demo User',
        phone: '+1234567890',
        address: '123 Demo Street, Demo City, 12345',
        role: 'user',
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        preferences: {
          newsletter: true,
          notifications: true,
          theme: 'light',
          language: 'en',
        },
      };
      
      return {
        user,
        sessionToken: 'mock_session_' + Date.now(),
        refreshToken: 'mock_refresh_' + Date.now(),
      };
    }
    
    // Admin demo user
    if (email === 'admin@rise.com' && password === 'Admin123!') {
      const user: User = {
        id: 'admin1',
        email: email,
        name: 'Admin User',
        phone: '+1234567890',
        address: '123 Admin Street, Admin City, 12345',
        role: 'admin',
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        preferences: {
          newsletter: true,
          notifications: true,
          theme: 'light',
          language: 'en',
        },
      };
      
      return {
        user,
        sessionToken: 'mock_session_admin_' + Date.now(),
        refreshToken: 'mock_refresh_admin_' + Date.now(),
      };
    }
    
    // Check stored users
    const storedUsers = JSON.parse(localStorage.getItem('rise_users') || '[]');
    const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      return {
        user: {
          ...userWithoutPassword,
          lastLogin: new Date().toISOString(),
        },
        sessionToken: 'session_' + Date.now(),
        refreshToken: 'refresh_' + Date.now(),
      };
    }
    
    throw new Error('Invalid email or password');
  },

  async register(userData: RegisterData): Promise<{ user: User; sessionToken: string; refreshToken: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate email
    if (!validateEmail(userData.email)) {
      throw new Error('Invalid email format');
    }
    
    // Validate password
    const passwordErrors = validatePassword(userData.password);
    if (passwordErrors.length > 0) {
      throw new Error(passwordErrors[0]);
    }
    
    // Check if user already exists
    const storedUsers = JSON.parse(localStorage.getItem('rise_users') || '[]');
    if (storedUsers.find((u: any) => u.email === userData.email)) {
      throw new Error('An account with this email already exists');
    }
    
    // Create new user
    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      password: userData.password, // In real app, this would be hashed
      isEmailVerified: false, // Would require email verification
      createdAt: new Date().toISOString(),
      preferences: {
        newsletter: userData.newsletter || false,
        notifications: true,
        theme: 'light',
        language: 'en',
      },
    };
    
    // Store user
    storedUsers.push(newUser);
    localStorage.setItem('rise_users', JSON.stringify(storedUsers));
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      sessionToken: 'session_' + Date.now(),
      refreshToken: 'refresh_' + Date.now(),
    };
  },

  async resetPassword(email: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!validateEmail(email)) {
      throw new Error('Invalid email format');
    }
    
    const storedUsers = JSON.parse(localStorage.getItem('rise_users') || '[]');
    const userExists = storedUsers.find((u: any) => u.email === email);
    
    if (!userExists) {
      throw new Error('No account found with this email address');
    }
    
    // In a real app, send password reset email
    console.log(`Password reset email sent to ${email}`);
    return true;
  },

  async verifyEmail(token: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate email verification
    return true;
  },

  async updateProfile(userId: string, userData: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const storedUsers = JSON.parse(localStorage.getItem('rise_users') || '[]');
    const userIndex = storedUsers.findIndex((u: any) => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Update user
    storedUsers[userIndex] = { ...storedUsers[userIndex], ...userData };
    localStorage.setItem('rise_users', JSON.stringify(storedUsers));
    
    const { password: _, ...userWithoutPassword } = storedUsers[userIndex];
    return userWithoutPassword;
  },

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      throw new Error(passwordErrors[0]);
    }
    
    const storedUsers = JSON.parse(localStorage.getItem('rise_users') || '[]');
    const userIndex = storedUsers.findIndex((u: any) => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    if (storedUsers[userIndex].password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }
    
    storedUsers[userIndex].password = newPassword;
    localStorage.setItem('rise_users', JSON.stringify(storedUsers));
    
    return true;
  },

  async refreshSession(refreshToken: string): Promise<{ sessionToken: string; refreshToken: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      sessionToken: 'new_session_' + Date.now(),
      refreshToken: 'new_refresh_' + Date.now(),
    };
  },

  async deleteAccount(userId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const storedUsers = JSON.parse(localStorage.getItem('rise_users') || '[]');
    const filteredUsers = storedUsers.filter((u: any) => u.id !== userId);
    localStorage.setItem('rise_users', JSON.stringify(filteredUsers));
    
    return true;
  },
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        sessionToken: action.payload.sessionToken,
        refreshToken: action.payload.refreshToken,
      };
    
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
        sessionToken: null,
        refreshToken: null,
      };
    
    case 'LOGOUT':
      return {
        ...initialState,
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload.user } : null,
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload.loading,
      };
    
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = getStoredAuth();
    if (storedAuth && storedAuth.sessionToken) {
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: storedAuth.user,
          sessionToken: storedAuth.sessionToken,
          refreshToken: storedAuth.refreshToken,
        },
      });
    }
  }, []);

  // Auto-refresh session token
  useEffect(() => {
    if (state.isAuthenticated && state.refreshToken) {
      const interval = setInterval(async () => {
        try {
          const tokens = await authAPI.refreshSession(state.refreshToken!);
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: {
              user: state.user!,
              sessionToken: tokens.sessionToken,
              refreshToken: tokens.refreshToken,
            },
          });
          storeAuth({
            user: state.user!,
            sessionToken: tokens.sessionToken,
            refreshToken: tokens.refreshToken,
          });
        } catch (error) {
          console.error('Failed to refresh session:', error);
          logout();
        }
      }, 15 * 60 * 1000); // Refresh every 15 minutes

      return () => clearInterval(interval);
    }
  }, [state.isAuthenticated, state.refreshToken]);

  // Action creators
  const login = async (email: string, password: string, rememberMe = false): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });
    try {
      const authData = await authAPI.login(email, password, rememberMe);
      dispatch({ type: 'AUTH_SUCCESS', payload: authData });
      
      if (rememberMe) {
        storeAuth(authData);
      }
      
      return true;
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: { error: (error as Error).message } });
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });
    try {
      const authData = await authAPI.register(userData);
      dispatch({ type: 'AUTH_SUCCESS', payload: authData });
      storeAuth(authData);
      return true;
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: { error: (error as Error).message } });
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    clearStoredAuth();
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      await authAPI.resetPassword(email);
      return true;
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: { error: (error as Error).message } });
      return false;
    }
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      await authAPI.verifyEmail(token);
      if (state.user) {
        dispatch({ type: 'UPDATE_USER', payload: { user: { isEmailVerified: true } } });
      }
      return true;
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: { error: (error as Error).message } });
      return false;
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!state.user) return false;
    
    dispatch({ type: 'SET_LOADING', payload: { loading: true } });
    try {
      const updatedUser = await authAPI.updateProfile(state.user.id, userData);
      dispatch({ type: 'UPDATE_USER', payload: { user: updatedUser } });
      
      // Update stored auth
      const storedAuth = getStoredAuth();
      if (storedAuth) {
        storeAuth({
          ...storedAuth,
          user: { ...storedAuth.user, ...updatedUser },
        });
      }
      
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
      return true;
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: { error: (error as Error).message } });
      return false;
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!state.user) return false;
    
    try {
      await authAPI.changePassword(state.user.id, currentPassword, newPassword);
      return true;
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: { error: (error as Error).message } });
      return false;
    }
  };

  const refreshSession = async (): Promise<boolean> => {
    if (!state.refreshToken) return false;
    
    try {
      const tokens = await authAPI.refreshSession(state.refreshToken);
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: state.user!,
          sessionToken: tokens.sessionToken,
          refreshToken: tokens.refreshToken,
        },
      });
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    if (!state.user) return false;
    
    try {
      await authAPI.deleteAccount(state.user.id);
      logout();
      return true;
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: { error: (error as Error).message } });
      return false;
    }
  };

  // Social Login Methods
  const loginWithGoogle = async (): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // In a real implementation, this would use Google OAuth SDK
      // For demo purposes, we'll create a mock Google user
      const mockGoogleUser: User = {
        id: `google_${Date.now()}`,
        email: 'google.user@gmail.com',
        name: 'Google User',
        firstName: 'Google',
        lastName: 'User',
        avatar: 'https://via.placeholder.com/150/4285f4/FFFFFF?text=G',
        role: 'user',
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        orderCount: 0,
        preferences: {
          newsletter: true,
          notifications: true,
          theme: 'light',
          language: 'en',
        },
      };

      const sessionToken = `google_token_${Date.now()}`;
      const refreshToken = `google_refresh_${Date.now()}`;

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: mockGoogleUser,
          sessionToken,
          refreshToken,
        },
      });

      return true;
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: { error: 'Google login failed. Please try again.' } });
      return false;
    }
  };

  const loginWithInstagram = async (): Promise<boolean> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // In a real implementation, this would use Instagram OAuth SDK
      // For demo purposes, we'll create a mock Instagram user
      const mockInstagramUser: User = {
        id: `instagram_${Date.now()}`,
        email: 'instagram.user@example.com',
        name: 'Instagram User',
        firstName: 'Instagram',
        lastName: 'User',
        avatar: 'https://via.placeholder.com/150/E4405F/FFFFFF?text=IG',
        role: 'user',
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        orderCount: 0,
        preferences: {
          newsletter: true,
          notifications: true,
          theme: 'light',
          language: 'en',
        },
      };

      const sessionToken = `instagram_token_${Date.now()}`;
      const refreshToken = `instagram_refresh_${Date.now()}`;

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: mockInstagramUser,
          sessionToken,
          refreshToken,
        },
      });

      return true;
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: { error: 'Instagram login failed. Please try again.' } });
      return false;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    resetPassword,
    verifyEmail,
    updateProfile,
    changePassword,
    refreshSession,
    deleteAccount,
    clearError,
    loginWithGoogle,
    loginWithInstagram,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
