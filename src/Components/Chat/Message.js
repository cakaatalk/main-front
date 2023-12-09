import React from "react";
import "../../css/components/message.css";

function Message({message, userId}) {
  const isOwnMessage = message.sender === userId ? 1 : 0;
  const messageRowClass = `message-row ${
    isOwnMessage ? "message-row--own" : ""
  }`;
  return (
    <div className={messageRowClass}>
      {!isOwnMessage && (
        <img
          src="https://avatars3.githubusercontent.com/u/3612017"
          alt={message.sender}
        />
      )}
      <div className="message-row__content">
        {!isOwnMessage && (
          <span className="message__author">{message.sender}</span>
        )}
        <div className="message__info">
          <span className="message__bubble">{message.message}</span>
          <span className="message__time">{message.timestamp}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;
