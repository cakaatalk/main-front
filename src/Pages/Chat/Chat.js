import React, { useEffect, useState } from "react";
import ChatHeader from "../../Components/Chat/ChatHeader";
import ChatScreen from "../../Components/Chat/ChatScreen";
import userService from "../../API/UserService";
import { WebSocketProvider } from "../../Contexts/SocketContext";

function Chat() {
  const [userInfo, setUserInfo] = useState();
  const roomId = localStorage.getItem("roomId");

  const fetchAllUserInfo = async () => {
    const response = await userService.getAllUserList();
    setUserInfo(response);
  };

  useEffect(() => {
    fetchAllUserInfo();
  }, []);
  return (
    <WebSocketProvider>
      <div id="chat-screen">
        <ChatHeader title="" />
        {userInfo ? <ChatScreen roomId={roomId} userInfo={userInfo} /> : ""}
      </div>
    </WebSocketProvider>
  );
}

export default Chat;
