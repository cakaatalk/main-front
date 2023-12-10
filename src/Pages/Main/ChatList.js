import React from "react";
import "../../css/components/chatScreen.css";
import { useEffect, useState } from "react";
import ChatService from "../../API/ChatService";
import AuthService from "../../API/AuthService";
import UserMessage from "../../Components/Chat/UserMessage";
import AddChat from "../Chat/AddChat";
import AddChatIcon from "../../assets/add-chat-room-icon.png";

function ChatList() {
  const [roomlist, setRoomList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchFriends();
  }, []);

  async function fetchFriends() {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const response = await ChatService.getRoomList();
      setRoomList(response);
    } catch (error) {
      if (error.response && refreshToken) {
        try {
          const refreshResponse = await AuthService.refreshAccessToken();
          localStorage.setItem("accessToken", refreshResponse.data.accessToken);
          fetchFriends();
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      } else {
        console.error("Error fetching friends:", error);
      }
    }
  }

  const onClickRoom = async (roomId) => {
    try {
      localStorage.setItem("roomId", roomId);
      localStorage.setItem("roomname", roomId);
      window.location.href = `/chat`;
    } catch (error) {
      try {
        const refreshResponse = await AuthService.refreshAccessToken();
        localStorage.setItem("accessToken", refreshResponse.data.accessToken);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }
  };

  return (
    <div>
      <div className="screen-header">
        <h1 className="header-title">채팅{roomlist.length}</h1>
        <button
          onClick={() => setShowPopup(true)}
          style={{ background: "transparent", border: "none" }}
        >
          <img src={AddChatIcon} height={"30px"} />
        </button>
      </div>

      {showPopup && <AddChat onClose={() => setShowPopup(false)}></AddChat>}

      <main className="main-screen">
        {Array.isArray(roomlist) &&
          roomlist.map((room) => (
            <UserMessage
              key={room.roomId}
              avatar={room.roomImage}
              name={room.roomName}
              time={room.time}
              badgeCount={room.badgeCount}
              chatId={room.roomId}
              message={room.lastMessage}
              onClick={() => onClickRoom(room.roomId)}
            />
          ))}
      </main>
    </div>
  );
}

export default ChatList;
