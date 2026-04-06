"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// On définit ce qu'est un utilisateur pour TypeScript
type UserType = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: "USER" | "ADMIN";
};

type AuthContextType = {
  user: UserType | null; // <--- CRUCIAL
  isLoggedIn: boolean;
  login: (userData: UserType) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn && data.user) {
          setUser(data.user);
          setIsLoggedIn(true);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = (userData: UserType) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
