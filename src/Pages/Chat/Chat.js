import React, { useEffect, useState } from "react";
import ChatHeader from "../../Components/Chat/ChatHeader";
import ChatScreen from "../../Components/Chat/ChatScreen";
import { WebSocketProvider } from "../../Contexts/SocketContext";

function Chat() {
  const [userInfo, setUserInfo] = useState();
  const roomId = localStorage.getItem("roomId");
  const accessToken = localStorage.getItem("accessToken");
  const fetchAllUserInfo = () => {
    const apiUrl = "http://localhost:8080/api/user/findAll";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => setUserInfo(res))
      .catch((error) => console.error("Error:", error));
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
