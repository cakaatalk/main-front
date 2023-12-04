import React, { useState } from 'react';
import UserComponent from './UserComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  // const response = await axios.get(`/api/user/${userId}/subtitle`);
  // setSubtitle(response.data.subtitle);
  const [subtitle, setSubtitle] = useState("KimJinWoo이올세"); 
  const additionalContent = <FontAwesomeIcon icon={faCommentAlt} size="2x" />;

  const handleEdit = () => {
    setIsEditing(true); 
  };

  const handleSubtitleChange = (e) => {
    setSubtitle(e.target.value); 
  };

  const handleSave = () => {
    setIsEditing(false); 
    // const response = await axios.put(`/api/user/${userId}/subtitle`, { subtitle });
    // setSubtitle(response.data.subtitle);
    // 서버에 저장
  };

  return (
    <UserComponent
      avatar="https://avatars3.githubusercontent.com/u/3612017"
      name="Me"
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