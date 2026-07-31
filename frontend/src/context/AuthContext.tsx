'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';
import { setTokens, clearTokens, getAccessToken, getRefreshToken } from '@/lib/auth';

interface User {
  id: number;
  email: string;
  // autres champs si besoin
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
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
          const res = await api.get('/auth/user/'); // endpoint à créer dans Django plus tard
          setUser(res.data);
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
    // Récupérer les infos utilisateur après login (appel à un endpoint user si on l'a)
    const userRes = await api.get('/auth/user/');
    setUser(userRes.data);
  };

  const register = async (data: any) => {
    const res = await api.post('/auth/inscription/', data);
    // Après inscription, on peut auto-login si l'API renvoie les tokens
    if (res.data.access) {
      setTokens(res.data.access, res.data.refresh);
      const userRes = await api.get('/auth/user/');
      setUser(userRes.data);
    }
  };

  const logout = () => {
    clearTokens();
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};