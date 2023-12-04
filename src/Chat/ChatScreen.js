import React from 'react';
import '../css/components/chatScreen.css';
import { Link } from 'react-router-dom';
import ChatData from './ChatData'; 


function Header() {
  return (
    <h1>채팅</h1>
  );
}


function UserMessage({ avatar, name, subtitle, time, badgeCount, chatId }) {
  return (
    <Link to={`/chat/${chatId}`} className="user-component-link">
      <div className="user-component">
        <div className="user-component__column">
          <img
            src={avatar}
            className="user-component__avatar user-component__avatar--xl"
            // className="user-component__subtitle">{subtitle}
            alt={name}
          />
          <div className="user-component__text">
            <h4 className="user-component__title">{name}</h4>
            
          </div>
        </div>
        <div className="user-component__column">
          <span className="user-component__time">{time}</span>
          {badgeCount > 0 && <div className="badge">{badgeCount}</div>}
        </div>
      </div>
    </Link>
  );
}


function ChatScreen() {
  return (
    <>
      <Header />
      <main className="main-screen">
        {ChatData.map(chat => (
          <UserMessage
            key={chat.chatId}
            avatar={chat.avatar}
            name={chat.name}
            subtitle={chat.subtitle}
            time={chat.time}
            badgeCount={chat.badgeCount}
            chatId={chat.chatId}
          />
        ))}
      </main>
    </>
  );
}

export default ChatScreen;
