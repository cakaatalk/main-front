import React, { useState, useEffect } from 'react';
import UserComponent from './UserComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import UserService from '../UserService';

function UserProfile() {
  const accessToken = localStorage.getItem('accessToken');

  const [isEditing, setIsEditing] = useState(false);
  const [subtitle, setSubtitle] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await UserService.searchProfile(1);
        if (response.data && response.data.user) {
          setSubtitle(response.data.user.subtitle);
          setUserProfile(response.data.user);
          setUserName(response.data.user.name);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    fetchProfile();
  }, [accessToken]); 

  const additionalContent = <FontAwesomeIcon icon={faCommentAlt} size="2x" />;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubtitleChange = (e) => {
    setSubtitle(e.target.value);
  };

  const handleSave = async () => {
    setIsEditing(false);
    await UserService.updateProfile(userProfile, subtitle);
  };

  return (
    <UserComponent
      avatar={userProfile}
      name={userName}
      subtitle={
        isEditing ? (
          <input
            type="text"
            value={subtitle}
            onChange={handleSubtitleChange}
            onBlur={handleSave}
          />
        ) : (
          subtitle
        )
      }
      bold={true}
      additionalContent={additionalContent}
      onEdit={handleEdit}
    />
  );
}

export default UserProfile;
