import React from 'react';
import '../css/components/chatScreen.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserService from '../UserService'; 
import AuthService from '../AuthService'; 
import UserComponent from '../User/UserComponent';

function Header() {
  return <h1 className="screen-header__title">채팅</h1>;
}

// function UserMessage({ avatar, name, time, badgeCount, chatId }) {
//   return (
//     <Link to={`/chat/${chatId}`} className="user-component-link">
//       <div className="user-component">
//         <div className="user-component__avatar-container">
//           <img
//             src={avatar}
//             className="user-component__avatar user-component__avatar--xl"
//             alt={name}
//           />
//         </div>
//         <div className="user-component__content">
//           <div className="user-component__name">
//             <h4 className="user-component__title">{name}</h4>
//           </div>
//           <div className="user-component__info">
//             {/* <span className="user-component__time">{time}</span> */}
//             {badgeCount > 0 && <div className="badge">{badgeCount}</div>}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

function ChatScreen() {
  const [friendsList, setFriendsList] = useState([]); 

  useEffect(() => {
    async function fetchFriends() {
      const refreshToken = localStorage.getItem('refreshToken');
    
      try {
        const response = await UserService.getFriendList();
        setFriendsList(response.data);
      } 
      catch (error) {
        if (error.response && refreshToken) {
          try {
            const refreshResponse = await AuthService.refreshAccessToken();
            localStorage.setItem('accessToken', refreshResponse.data.accessToken);
            fetchFriends(); 
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
          }
        } else {
          console.error('Error fetching friends:', error);
        }
      }
    }
  
    fetchFriends();
  }, []);

  return (
    <>
      <div className="screen-header">
        <Header />
        <div className="screen-header__icons">
        </div>
      </div>
      <main className="main-screen">
      {Array.isArray(friendsList) && friendsList.map(friend => (
          
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

export default ChatScreen;
