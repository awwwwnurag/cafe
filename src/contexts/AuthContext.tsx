
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database for demo
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password123',
    name: 'Demo User',
    avatar: 'https://i.pravatar.cc/150?u=demo@example.com'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('CanteenCraze_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isLoading: false,
          error: null
        });
      } catch (e) {
        localStorage.removeItem('CanteenCraze_user');
        setAuthState({
          user: null,
          isLoading: false,
          error: null
        });
      }
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        error: null
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials against mock database
      const user = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Create safe user object (without password)
      const safeUser: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      };
      
      // Save to localStorage
      localStorage.setItem('CanteenCraze_user', JSON.stringify(safeUser));
      
      setAuthState({
        user: safeUser,
        isLoading: false,
        error: null
      });
      
      toast({
        title: "Login successful",
        description: `Welcome back, ₹{safeUser.name || safeUser.email}!`,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      }));
      
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : 'Login failed',
        variant: "destructive"
      });
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      // In a real app, we would create the user in the database
      // For demo purposes, we'll just create a mock user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name,
        avatar: `https://i.pravatar.cc/150?u=₹{email}`
      };
      
      // Save to localStorage
      localStorage.setItem('CanteenCraze_user', JSON.stringify(newUser));
      
      setAuthState({
        user: newUser,
        isLoading: false,
        error: null
      });
      
      toast({
        title: "Signup successful",
        description: `Welcome to CanteenCraze, ₹{name || email}!`,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Signup failed'
      }));
      
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : 'Signup failed',
        variant: "destructive"
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('CanteenCraze_user');
    setAuthState({
      user: null,
      isLoading: false,
      error: null
    });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
