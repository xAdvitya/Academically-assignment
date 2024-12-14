"use client";
import React, { createContext, useEffect, useState } from "react";

//auth context

type AuthContextType = {
  currentUser: any;
  updateUser: (data: any) => void;
  isAdmin: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  updateUser: () => {},
  isAdmin: false,
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Sync currentUser state with localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        setIsAdmin(parsedUser.username === "admin");
      }
      setIsLoaded(true);
    }
  }, []);

  const updateUser = (data: any) => {
    if (data) {
      setCurrentUser(data);
      setIsAdmin(data.username === "admin"); // Dynamically update admin status
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      // Reset to initial state if data is null
      setCurrentUser(null);
      setIsAdmin(false);
      localStorage.removeItem("user");
    }
  };

  // Render null until localStorage syncs to avoid hydration issues
  if (!isLoaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ currentUser, updateUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
