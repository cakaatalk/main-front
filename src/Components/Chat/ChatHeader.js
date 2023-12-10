import React, { useEffect, useState } from "react";
import "../../css/components/chatHeader.css";
import ChatService from "../../API/ChatService";

function ChatHeader({ roomId }) {
  const [roomInfo, setRoomInfo] = useState();
  const fetchRoomInfo = async () => {
    const temp = await ChatService.getRoomInfo(roomId);
    setRoomInfo(temp);
  };
  useEffect(() => {
    fetchRoomInfo();
  }, []);
  return (
    <header className="alt-header">
      <div className="alt-header__column">
        {roomInfo ? (
          <>
            <h1 className="alt-header__title">{roomInfo.roomName} </h1>
            <span>{roomInfo.roomSize}</span>
          </>
        ) : (
          ""
        )}
      </div>
      <h1> </h1>
    </header>
  );
}

export default ChatHeader;
