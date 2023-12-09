import React from "react";
import ChatHeader from "../../Components/Chat/ChatHeader";
import ChatScreen from "../../Components/Chat/ChatScreen";
import { WebSocketProvider } from "../../Contexts/SocketContext";

function Chat() {
  const roomName = localStorage.getItem('roomName');
  return (
    <WebSocketProvider>
      <div id="chat-screen">
        <ChatHeader title="" />
        <ChatScreen />
      </div>
    </WebSocketProvider>
  );
}

export default Chat;
