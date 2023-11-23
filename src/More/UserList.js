import React from 'react';
import UserComponent from '../User/UserComponent'; 
import '../css/components/friends.css'; 

function UserList({ users }) {
  if (!Array.isArray(users)) {
    return <div>친구가..없으신가요?</div>;
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <UserComponent
          key={user.id}
          avatar={user.profilePicture} 
          name={user.name} 
          subtitle={user.status} 
          bold={true}
          // 문자하기 등 추가 기능 여기다가
          additionalContent={<button>Add Friend</button>}
        />
      ))}
    </div>
  );
}

export default UserList;