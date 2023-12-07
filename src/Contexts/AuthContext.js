import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  authState: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  const signIn = (token, user) => {
    setAuthState({
      isAuthenticated: true,
      token: token,
      user: user,
    });
    localStorage.setItem("accessToken", token);
  };

  const signOut = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
    });
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ authState, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
