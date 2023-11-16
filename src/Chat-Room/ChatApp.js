import React from 'react';
import ChatHeader from './ChatHeader';
import ReplyForm from './ReplyForm';
import ChatScreen from './ChatScreen';

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
