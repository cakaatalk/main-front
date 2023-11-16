// Message.js
import React from 'react';

function Message({ author, content, time, isOwnMessage }) {
  const messageRowClass = `message-row ${isOwnMessage ? 'message-row--own' : ''}`;
  return (
    <div className={messageRowClass}>
      {!isOwnMessage && <img src="https://avatars3.githubusercontent.com/u/3612017" alt={author} />}
      <div className="message-row__content">
        {!isOwnMessage && <span className="message__author">{author}</span>}
        <div className="message__info">
          <span className="message__bubble">{content}</span>
          <span className="message__time">{time}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;
