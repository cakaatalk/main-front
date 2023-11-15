import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCommentDots, faCog } from '@fortawesome/free-solid-svg-icons';
import '../css/components/sidebar.css'; 

function Sidebar() {
  return (
    <div className="sidebar">
      <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
      {/* 추가 아이콘 */}
      <FontAwesomeIcon icon={faCommentDots} className="sidebar-icon" />
      <FontAwesomeIcon icon={faCog} className="sidebar-icon" />
      {/* 프로필 이미지 */}
      <div className="profile-area">
        <img src="/path-to-profile-image.jpg" alt="Profile" className="profile-image" />
        <span className="profile-name">User Name</span>
      </div>
      {/* 여기에 추가적인 사이드바 아이템들 */}
    </div>
  );
}

export default Sidebar;
