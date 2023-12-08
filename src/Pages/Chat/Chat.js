import React from "react";
import ChatHeader from "../../Components/Chat/ChatHeader";
import ChatScreen from "../../Components/Chat/ChatScreen";
import { WebSocketProvider } from "../../Contexts/SocketContext";

function Chat() {
  return (
    <WebSocketProvider>
      <div id="chat-screen">
        <ChatHeader title="니꼬" />
        <ChatScreen />
      </div>
    </WebSocketProvider>
  );
}

export default Chat;
