import React from 'react';
import UserComponent from '../User/UserComponent';
import UserService from '../UserService'; 
import AuthService from '../AuthService'; 
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function UserList() {
  const handleAddFriend = async (userId) => {
    try {
      await UserService.addFriend(userId);
    }
    catch (error) {
      try {
        const refreshResponse = await AuthService.refreshAccessToken();
        localStorage.setItem('accessToken', refreshResponse.data.accessToken);

      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
      }
  }
  };

  const [maxHeight, setMaxHeight] = useState('auto');
  const [friendsList, setFriendsList] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function fetchFriends() {
    
      try {
        const response = await UserService.getAllUserList();
        setFriendsList(response.data);
      } 
      catch (error) {
        if (error.response) {
          try {
            const refreshResponse = await AuthService.refreshAccessToken();
            localStorage.setItem('accessToken', refreshResponse.data.accessToken);
            return fetchFriends();
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
          }
        } else {
          console.error('Error fetching friends:', error);
        }
      }
    }

    
    fetchFriends();

    
    function updateMaxHeight() {
      const header = document.querySelector('.header');
      const footer = document.querySelector('.footer');
      
      if (header && footer) {
        const headerHeight = header.offsetHeight;
        const footerHeight = footer.offsetHeight;
        const newMaxHeight = window.innerHeight - headerHeight - footerHeight;
        setMaxHeight(`${newMaxHeight}px`);
      }
    }

    window.addEventListener('resize', updateMaxHeight);
    updateMaxHeight();

    return () => window.removeEventListener('resize', updateMaxHeight);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = searchQuery
          ? await UserService.searchUser(searchQuery)
          : await UserService.getAllUserList();
        setUserList(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  return (
    <div className="friends-list-container" style={{ maxHeight }}>
     <div className="search-box">
      <div className="search-icon"></div>
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="이름 검색"
          value={searchQuery}
          
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="friends-header">
        <h2 className="friends-list-title">전체 유저{Array.isArray(friendsList) ? friendsList.length : 0}</h2>
      </div>
      <div className="friends-divider"></div>
      <div className="friends-list">
        {Array.isArray(friendsList) && friendsList.map(friend => (
          
          <UserComponent
            key={friend.id}  
            avatar={friend.image_url}
            name={friend.user_name}
            subtitle={friend.comment}
            bold={true}
            additionalContent={() => (
              <FontAwesomeIcon icon={faUserPlus} size="2x" onClick={() => handleAddFriend(friend.id)} />
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default UserList;