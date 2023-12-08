import React from "react";
import ChatHeader from "../../Components/Chat/ChatHeader";
import ReplyForm from "../../Components/Chat/ReplyForm";
import ChatScreen from "../../Components/Chat/ChatScreen";

function ChatApp() {
  return (
    <div id="chat-screen">
      <ChatHeader title="니꼬" />
      <ChatScreen />
      <ReplyForm />
    </div>
  );
}

export default ChatApp;
