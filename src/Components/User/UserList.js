import React from "react";
import UserComponent from "../User/UserComponent";
import UserService from "../../API/UserService";
import AuthService from "../../API/AuthService";
import { useEffect, useState } from "react";
import Add from "../../assets/add-friend-icon.png";
import Search from "../../assets/search-icon.png";


function UserList() {
  const handleAddFriend = async (userId) => {
    try {
      await UserService.addFriend(userId);
    } catch (error) {
      try {
        const refreshResponse = await AuthService.refreshAccessToken();
        localStorage.setItem("accessToken", refreshResponse.data.accessToken);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }
  };

  const [maxHeight, setMaxHeight] = useState("auto");
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function fetchFriends() {
      try {
        const response = await UserService.getAllUserList();
        setUserList(response);
      } catch (error) {
        if (error.response) {
          try {
            const refreshResponse = await AuthService.refreshAccessToken();
            localStorage.setItem("accessToken",refreshResponse.data.accessToken);
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = searchQuery
          ? await UserService.searchUser(searchQuery)
          : await UserService.getAllUserList();
        setUserList(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  return (
    <div className="friends-list-container" style={{ maxHeight }}>
      <div className="search-box">
        <div className="search-icon"></div>
          <img src={Search} alt={"Search"} />
        <input
          type="text"
          placeholder="이름 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="friends-header">
        <h2 className="friends-list-title">
          전체 유저{Array.isArray(userList) ? userList.length : 0}
        </h2>
      </div>
      <div className="friends-divider"></div>
      <div className="friends-list">
        {Array.isArray(userList) &&
          userList.map((friend) => (
            <UserComponent
              key={friend.id}
              avatar={friend.imageURL}
              name={friend.name}
              subtitle={friend.comment}
              bold={true}
              additionalContent={() => (
                <img src={Add} alt={"Add"} />
              )}
            />
          ))}
      </div>
    </div>
  );
}

export default UserList;
