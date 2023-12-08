import React from "react";
import "../../css/components/chatScreen.css";
import { useEffect, useState } from "react";
import UserService from "../../API/UserService";
import AuthService from "../../API/AuthService";
import UserComponent from "../../Components/User/UserComponent";

function Header() {
  return <h1 className="screen-header__title">채팅</h1>;
}

function ChatList() {
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    async function fetchFriends() {
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const response = await UserService.getFriendList();
        setFriendsList(response.data);
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

    fetchFriends();
  }, []);

  return (
    <>
      <div className="screen-header">
        <Header />
        <div className="screen-header__icons"></div>
      </div>
      <main className="main-screen">
        {Array.isArray(friendsList) &&
          friendsList.map((friend) => (
            <UserComponent
              key={friend.id}
              avatar={friend.image_url}
              name={friend.user_name}
              subtitle={friend.comment}
              bold={true}
              // additionalContent= {additionalContent} //유저의 마지막 메세지를 표기하기로
            />
          ))}
      </main>
    </>
  );
}

export default ChatList;
