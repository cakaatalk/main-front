import React from 'react';
import ChatHeader from './ChatHeader';
import Message from './Message';
import ReplyForm from './ReplyForm';
import '../css/styles.css';

function ChatApp() {
  return (
    <div id="chat-screen">
      <ChatHeader title="니꼬" />
      <main className="main-screen main-chat">
        <div className="chat__timestamp">Tuesday, June 30, 2020</div>
        <Message author="Nicolas" content="Hi!" time="21:27" />
        <Message content="Hi nice to meet you!" time="21:27" isOwnMessage={true} />
      </main>
      <ReplyForm />
    </div>
  );
}

export default ChatApp;
