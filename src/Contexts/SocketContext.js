import React, { createContext, useContext, useEffect } from "react";
import env from "../Components/Common/dotenv"

const SocketContext = createContext();

const socket = new WebSocket(`${env.REACT_APP_SOCKET_BASE_URL}`);

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
