import React from "react";
import "../../css/components/chatScreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ChatService from "../../API/ChatService";
import AuthService from "../../API/AuthService";
import UserMessage from "../../Components/Chat/UserMessage";
import AddChat from "../Chat/AddChat";

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
      console.log(response.data);
      setRoomList(response.data);
    } catch (error) {
      if (error.response && refreshToken) {
        try {
          const refreshResponse = await AuthService.refreshAccessToken();
          localStorage.setItem(
            "accessToken",
            refreshResponse.data.accessToken
          );
          fetchFriends();
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      } else {
        console.error("Error fetching friends:", error);
      }
    }
  }

  return (
    <div>
      <div className="screen-header">
        <h1 className="header-title">채팅{roomlist.length}</h1>
        <button onClick={() => setShowPopup(true)}>방만들기</button>
      </div>

      {showPopup &&
        <AddChat onClose={() => setShowPopup(false)}>
        </AddChat>}


      <main className="main-screen">
        {Array.isArray(roomlist) &&
          roomlist.map((room) => (
            <UserMessage
              key={room.id}
              avatar={room.avatar}
              name={room.users}
              time={room.time}
              badgeCount={room.badgeCount}
              chatId={room.room_id}
            />
          ))}
      </main>
    </div >
  );
}

export default ChatList;
