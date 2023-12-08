import React from "react";
import UserComponent from "./UserComponent";
import UserService from "../../API/UserService";
import AuthService from "../../API/AuthService";
import Comment from "../../assets/comment-icon.png";

import { useEffect, useState } from "react";

import "../../css/components/friendList.css";

function FriendsList() {
  const additionalContent = <img src={Comment} alt={"Comment"} />
  const [maxHeight, setMaxHeight] = useState("auto");
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    async function fetchFriends() {
      try {
        const response = await UserService.getFriendList();
        if (response && Array.isArray(response.users)) {
          setFriendsList(response.users);
        }
      } catch (error) {
        if (error.response) {
          try {
            const refreshResponse = await AuthService.refreshAccessToken();
            localStorage.setItem("accessToken", refreshResponse.data.accessToken);
            return fetchFriends();
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
          }
        } else {
          console.error("Error fetching friends:", error);
        }
      }
    }

    fetchFriends();

    function updateMaxHeight() {
      const header = document.querySelector(".header");
      const footer = document.querySelector(".footer");

      if (header && footer) {
        const headerHeight = header.offsetHeight;
        const footerHeight = footer.offsetHeight;
        const newMaxHeight = window.innerHeight - headerHeight - footerHeight;
        setMaxHeight(`${newMaxHeight}px`);
      }
    }

    window.addEventListener("resize", updateMaxHeight);
    updateMaxHeight();

    return () => window.removeEventListener("resize", updateMaxHeight);
  }, []);

  return (
    <div className="friends-list-container" style={{ maxHeight }}>
      <div className="friends-header">
        <h2 className="friends-list-title">친구  {friendsList.length}</h2>
      </div>
      <div className="friends-divider"></div>
      <div className="friends-list">
        {friendsList.map((friend) => (
          <UserComponent
            key={friend.id}
            avatar={friend.imageURL}
            name={friend.name}
            subtitle={friend.comment}
            additionalContent={
              <div to={`/chat/${friend.id}`} className="additional-content-link" >
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
