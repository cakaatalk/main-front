import React from "react";
import "../../css/components/message.css";
import env from "../Common/dotenv";

function Message({ message, userId, senderInfo }) {
  const isOwnMessage = message.sender === userId;
  const messageRowClass = `message-row ${
    isOwnMessage ? "message-row--own" : ""
  }`;
  return (
    <div className={messageRowClass}>
      {!isOwnMessage ? (
        <img
          src={
            senderInfo.profileImage == null || senderInfo.profileImage == ""
              ? `${env.REACT_APP_IMAGE_BASE_URL}/uploads/default-profile.png`
              : senderInfo.profileImage
          }
          alt={senderInfo.name}
        />
      ):""}
      <div className="message-row__content">
        {!isOwnMessage ? (
          <span className="message__author">{senderInfo.name}</span>
        ):""}
        <div className="message__info">
          <span className="message__bubble">{message.content}</span>
          <span className="message__time">{message.timestamp}</span>
        </div>
      </div>
    </div>
  );
}

export default Message;
