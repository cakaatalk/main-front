import React from "react";
import UserComponent from "../User/UserComponent";
import UserService from "../../API/UserService";
import AuthService from "../../API/AuthService";

import Add from "../../assets/add-friend-icon.png";
import Search from "../../assets/search-icon.png";

import { FriendsContext } from "../../Contexts/FriendsContext";
import { useContext, useEffect, useState } from "react";

function UserList() {
  const { addedFriends, setAddedFriends } = useContext(FriendsContext);

  const [showAddedFriends, setShowAddedFriends] = useState(false);
  const [maxHeight, setMaxHeight] = useState("auto");
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [me, setUser] = useState([]);

  const handleAddFriend = async (userId) => {
    try {
      await UserService.addFriend(userId);
      setAddedFriends([...addedFriends, userId]);
      setUserList(prevUserList => prevUserList.filter(user => user.id !== userId));
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
    async function fetchFriends() {
      try {
        const response = await UserService.getAllUserList();
        const profile  = await UserService.searchProfile();
        setUser(profile);
        setUserList(response.filter(user => user.id !== profile.id)); 
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
        let response = searchQuery
          ? await UserService.searchUser(searchQuery)
          : await UserService.getAllUserList();
  
          response = response.filter(user => user.id !== me.id);
  
        setUserList(response);
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
          <div className="search-icon">
          <img src={Search} alt={"Search"} />
          </div>
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
            전체 유저 { Array.isArray(userList) ? (
          me ? userList.length : userList.length)
          : 0
           }
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
            .filter(friend => friend.id !== me.id)
            .filter(
              (friend) => showAddedFriends || !addedFriends.includes(friend.id)
            )
            .map( friend => (
              <UserComponent
                key={friend.id}
                avatar={
                  !friend.profileImage
                    ? "http://localhost:8040/uploads/default-profile.png"
                    : friend.profileImage
                }
                name={friend.name}
                subtitle={friend.comment}
                bold={true}
                additionalContent={() =>
                  !addedFriends.includes(friend.id) && (
                    <img
                      src={Add}
                      alt={"Add"}
                      className="add-friend-icon"
                      onClick={() => handleAddFriend(friend.id)}
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
