import React from 'react';
import '../css/components/chatScreen.css';
import { Link } from 'react-router-dom';
import ChatData from './ChatData';

function Header() {
  return <h1 className="screen-header__title">채팅</h1>;
}

function UserMessage({ avatar, name, time, badgeCount, chatId }) {
  return (
    <Link to={`/chat/${chatId}`} className="user-component-link">
      <div className="user-component">
        <div className="user-component__avatar-container">
          <img
            src={avatar}
            className="user-component__avatar user-component__avatar--xl"
            alt={name}
          />
        </div>
        <div className="user-component__content">
          <div className="user-component__name">
            <h4 className="user-component__title">{name}</h4>
          </div>
          <div className="user-component__info">
            {/* <span className="user-component__time">{time}</span> */}
            {badgeCount > 0 && <div className="badge">{badgeCount}</div>}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ChatScreen() {
  return (
    <>
      <div className="screen-header">
        <Header />
        <div className="screen-header__icons">
        </div>
      </div>
      <main className="main-screen">
        {ChatData.map(chat => (
          <UserMessage
            key={chat.chatId}
            avatar={chat.avatar}
            name={chat.name}
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
