import React from "react";
import "../../css/components/message.css";

function Message({ message, userId, senderInfo }) {
  console.log(senderInfo);
  const isOwnMessage = message.sender === userId;
  const messageRowClass = `message-row ${
    isOwnMessage ? "message-row--own" : ""
  }`;
  return (
    <div className={messageRowClass}>
      {!isOwnMessage && (
        <img
          src={
            senderInfo.profileImage == null || senderInfo.profileImage == ""
              ? "http://localhost:8040/uploads/default-profile.png"
              : senderInfo.profileImage
          }
          alt={senderInfo.name}
        />
      )}
      <div className="message-row__content">
        {!isOwnMessage && (
          <span className="message__author">{senderInfo.name}</span>
        )}
        <div className="message__info">
          <span className="message__bubble">{message.content}</span>
          <span className="message__time">{message.timestamp}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;
