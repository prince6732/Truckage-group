"use client";

import  { createContext, useState, useEffect, useContext, ReactNode } from "react";
import * as authService from "../services/authService";
import { User } from "../common/interface";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
  setUserDirectly: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

const fetchUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      setLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);

    setUser(user);
  } catch (error) {
    console.error("Failed to fetch user:", error);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      window.location.href = "/login";
    }
  };

  const refetchUser = async () => {
    await fetchUser();
  };

  const setUserDirectly = (user: User | null) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refetchUser, setUserDirectly }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
