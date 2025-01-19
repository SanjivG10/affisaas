"use client";

import { User } from "@/types";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    try {
      if (!storedUser) throw new Error("No user data found");
      const userData = JSON.parse(storedUser ?? "{}");
      setUser(userData);
    } catch {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
