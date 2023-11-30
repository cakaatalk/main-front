import React, { useState, useEffect } from 'react';
import UserList from './UserList'; // A new component you'll create
import NavigationBar from '../Common/NavigationBar';
import StatusBar from '../Common/StatusBar';
import '../css/components/moreApp.css';

function MoreApp() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 백엔드에서 유저 데이터 받아오기
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // 백엔드 API 받아오기 (임시임)
        const data = await response.json(); //json으로 받아와서
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {/* <StatusBar /> */}
      <NavigationBar />
      <main className="main-screen more-screen">
        <UserList users={users} /> {/* 유저 목록 받아오기 */}
      </main>
      <div id="no-mobile"></div>
    </div>
  );
}

export default MoreApp;