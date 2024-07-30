"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import axiosPublic from "@/lib/axiosPublic";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  loading: boolean;
  setUser: React.Dispatch<any>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  console.log(user);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axiosPublic.post("/user/login", {
        email,
        password,
      });
      console.log(response);
      setUser(response.data.data._doc);
      localStorage.setItem("authToken", response.data.data.token);
      return response;
    } catch (error) {
      setUser(null);
      throw new Error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("authToken");
    setLoading(true);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, setLoading, logout, loading }}
    >
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
