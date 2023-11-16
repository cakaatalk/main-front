import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCommentDots, faMusic, faCog } from '@fortawesome/free-solid-svg-icons';
import '../css/components/chatScreen.css';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className="screen-header">
      <h1 className="screen-header__title">Chats</h1>
      <div className="screen-header__icons">
        {/* <FontAwesomeIcon icon={faSearch} size="lg" /> */}
        {/* <FontAwesomeIcon icon={faCommentDots} size="lg" /> */}
        {/* <FontAwesomeIcon icon={faMusic} size="lg" /> */}
        {/* <FontAwesomeIcon icon={faCog} size="lg" /> */}
      </div>
    </header>
  );
}

function UserMessage({ avatar, name, subtitle, time, badgeCount }) {
  return (
    <div className="user-component">
      <div className="user-component__column">
        <img
          src={avatar}
          className="user-component__avatar"
          alt={name}
        />
        <div className="user-component__text">
          <h4 className="user-component__title">{name}</h4>
          <h6 className="user-component__subtitle">{subtitle}</h6>
        </div>
      </div>
      <div className="user-component__column">
        <span className="user-component__time">{time}</span>
        {badgeCount > 0 && <div className="badge">{badgeCount}</div>}
      </div>
    </div>
  );
}

function ChatScreen() {
  return (
    <>
      <Header />
      <main className="main-screen">
        <UserMessage
          avatar="https://avatars3.githubusercontent.com/u/3612017"
          name="Nicolas"
          subtitle="Please check My Kokoa Account Info"
          time="21:22"
          badgeCount={1}
        />
      </main>
    </>
  );
}

export default ChatScreen;
