import React from "react";
import UserComponent from "./UserComponent";
import UserService from "../../API/UserService";
import ChatService from "../../API/ChatService";
import AuthService from "../../API/AuthService";
import Comment from "../../assets/comment-icon.png";

import { useEffect, useState } from "react";

import "../../css/components/friendList.css";

function FriendsList() {
  const additionalContent = <img src={Comment} alt={"Comment"} />;
  const [maxHeight, setMaxHeight] = useState("auto");
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    fetchFriends();
    window.addEventListener("resize", updateMaxHeight);
    updateMaxHeight();

    return () => window.removeEventListener("resize", updateMaxHeight);
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await UserService.getFriendList();
      if (response && Array.isArray(response.users)) {
        setFriendsList(response.users);
      }
    } catch (error) {
      if (error.response) {
        try {
          const refreshResponse = await AuthService.refreshAccessToken();
          localStorage.setItem(
            "accessToken",
            refreshResponse.data.accessToken
          );
          return fetchFriends();
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      } else {
        console.error("Error fetching friends:", error);
      }
    }
  }

  const updateMaxHeight = () => {
    const header = document.querySelector(".header");
    const footer = document.querySelector(".footer");

    if (header && footer) {
      const headerHeight = header.offsetHeight;
      const footerHeight = footer.offsetHeight;
      const newMaxHeight = window.innerHeight - headerHeight - footerHeight;
      setMaxHeight(`${newMaxHeight}px`);
    }
  }

  const enterRoom = async (userId) => {
    let roomId;
    try {
      roomId = await ChatService.getRoomId([userId]);
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
    <div className="friends-list-container" style={{ maxHeight }}>
      <div className="friends-header">
        <h2 className="friends-list-title">친구 {friendsList.length}</h2>
      </div>
      <div className="friends-divider"></div>
      <div className="friends-list">
        {friendsList.map((friend) => (
          <UserComponent
            key={friend.id}
            avatar={
              friend.profileImage == null || friend.profileImage == ""
                ? "http://localhost:8040/uploads/default-profile.png"
                : friend.profileImage
            }
            name={friend.name}
            subtitle={friend.comment}
            additionalContent={
              <div
                className="additional-content-link"
                onClick={() => enterRoom(friend.id)}
              >
                {additionalContent}{" "}
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default FriendsList;
