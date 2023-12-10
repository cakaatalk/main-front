import React from "react";
import UserComponent from "../User/UserComponent";
import UserService from "../../API/UserService";
import AuthService from "../../API/AuthService";

import Add from "../../assets/add-friend-icon.png";

import { useContext, useEffect, useState } from "react";

function UserList() {
  const [showAddedFriends, setShowAddedFriends] = useState(false);
  const [maxHeight, setMaxHeight] = useState("auto");
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [me, setUser] = useState([]);

  const handleAddFriend = async (userId) => {
    try {
      await UserService.addFriend(userId);
      setUserList((prevUserList) =>
        prevUserList.filter((user) => user.id !== userId)
      );
    } catch (error) {
      try {
        const refreshResponse = await AuthService.refreshAccessToken();
        localStorage.setItem("accessToken", refreshResponse.data.accessToken);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }
  };

  useEffect(() => {
    async function fetchAllUser() {
      try {
        const response = await UserService.getAllUserList();
        const profile = await UserService.searchProfile();
        setUser(profile);
        setUserList(response);
      } catch (error) {
        if (error.response) {
          try {
            const refreshResponse = await AuthService.refreshAccessToken();
            localStorage.setItem(
              "accessToken",
              refreshResponse.data.accessToken
            );
            return fetchAllUser();
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
          }
        } else {
          console.error("Error fetching friends:", error);
        }
      }
    }

    fetchAllUser();

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
        let response = searchQuery
          ? await UserService.searchUser(searchQuery)
          : await UserService.getAllUserList();

        response = response.filter((user) => user.id !== me.id);

        setUserList(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [searchQuery, me]);

  const toggleAddedFriends = () => {
    setShowAddedFriends(!showAddedFriends);
  };

  return (
    <>
      <div className="friends-list-container" style={{ maxHeight }}>
        <div className="search-box">
          
          <input
            type="text"
            placeholder="이름 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="friends-header">
        <h2 className="friends-list-title">
          전체 유저{" "}
          {showAddedFriends
          ? userList.length
          : userList.filter((user) => !user.isFriend).length}
          <button
            className="toggle-friends-button"
            onClick={toggleAddedFriends}
          >
            {showAddedFriends ? "추가된 친구 숨기기" : "모든 친구 보기"}
          </button>
        </h2>
      </div>
      <div className="friends-divider"></div>

      <div className="friends-list">
        {Array.isArray(userList) &&
          userList
            .filter((friend) => showAddedFriends || !friend.isFriend)
            .map((friend) => (
              <UserComponent
                key={friend.id}
                avatar={friend.profileImage}
                name={friend.name}
                subtitle={friend.comment}
                bold={true}
                additionalContent={() =>
                  !friend.isFriend && (
                    <img
                      src={Add}
                      alt={"Add"}
                      className="add-friend-icon"
                      onClick={() => handleAddFriend(friend.id)}
                      height={"30px"}
                    />
                  )
                }
              />
            ))}
      </div>
    </>
  );
}

export default UserList;
