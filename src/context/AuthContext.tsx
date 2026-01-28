import { createContext } from "react";

export type UserDB = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type User = Omit<UserDB, "password">;

export type AuthContextType = {
  user: User | null;
  register: (name: string, email: string, password: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
