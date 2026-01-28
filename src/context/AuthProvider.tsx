import { useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";
import { users } from "../data/user";

type DbUser = User & { password: string };

const STORAGE_KEY = "auth_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string): boolean => {
    const foundUser = (users as DbUser[]).find(
      (u) => u.email === email && u.password === password,
    );

    if (!foundUser) return false;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = foundUser;
    setUser(safeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));

    return true;
  };

  const register = (name: string, email: string, password: string): boolean => {
    const exists = (users as DbUser[]).some((u) => u.email === email);
    if (exists) return false;

    const newUser: DbUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    };

    users.push(newUser);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
