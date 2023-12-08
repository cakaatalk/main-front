import React, { createContext, useContext, useEffect } from "react";

const SocketContext = createContext();

const socket = new WebSocket("ws://localhost:3001");

export function useSocket() {
  return useContext(SocketContext);
}

export function WebSocketProvider({ children }) {
  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
