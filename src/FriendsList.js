import React from 'react';
import UserComponent from './UserComponent';

function FriendsList() {
  return (
    <div>
      <UserComponent avatar="https://avatars3.githubusercontent.com/u/3612017" name="Nicolas" />
      {/* 여기에 추가적인 친구 컴포넌트를 렌더링할 수 있음. */}
      {/* 위와 같은 형식을 지켜야함. UserComponent avatar = name = */}
      {/* 동현이한테 API를 받아와서 여기에 Save & Delete해야한다고 생각 */}
    </div>
  );
}

export default FriendsList;
