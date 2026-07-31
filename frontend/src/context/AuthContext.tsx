'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';
import { setTokens, clearTokens, getAccessToken, getRefreshToken } from '@/lib/auth';

interface User {
  id: number;
  email: string;
  isStaff: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Record<string, unknown>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const access = getAccessToken();
      if (access) {
        try {
          const res = await api.get('/auth/user/');
          setUser({
            id: res.data.id,
            email: res.data.email,
            isStaff: res.data.is_staff,
          });
        } catch {
          clearTokens();
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login/', { email, password });
    setTokens(res.data.access, res.data.refresh);
    const userRes = await api.get('/auth/user/');
    setUser({
      id: userRes.data.id,
      email: userRes.data.email,
      isStaff: userRes.data.is_staff,
    });
  };

  const register = async (data: Record<string, unknown>) => {
    const res = await api.post('/auth/inscription/', data);
    if (res.data.access) {
      setTokens(res.data.access, res.data.refresh);
      const userRes = await api.get('/auth/user/');
      setUser({
        id: userRes.data.id,
        email: userRes.data.email,
        isStaff: userRes.data.is_staff,
      });
    }
  };

  const logout = () => {
    clearTokens();
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.isStaff ?? false;

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};