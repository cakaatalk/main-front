import React from 'react';
import UserComponent from '../User/UserComponent';
import axios from 'axios';
import UserService from '../UserService'; 
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "../css/components/friendList.css"


function UserList() {
  const additionalContent = <FontAwesomeIcon icon={faCommentAlt} size="2x" />;
  const [maxHeight, setMaxHeight] = useState('auto');
  const [friendsList, setFriendsList] = useState([]); 
  
  useEffect(() => {
    async function fetchFriends() {
      const refreshToken = localStorage.getItem('refreshToken');
    
      try {
        const response = await UserService.getAllUserList();
          setFriendsList(response.data.users);
      } catch (error) {
        if (error.response && refreshToken) {
          try {
            const refreshResponse = await axios.get('/api/auth/refresh', { refreshToken });
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

  return (
    <div className="friends-list-container" style={{ maxHeight }}>
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
            additionalContent={<Link to={`/chat/${friend.id}`} className="additional-content-link">
            {additionalContent} </Link>}
          />
        ))}
      </div>
    </div>
  );
}

export default UserList;