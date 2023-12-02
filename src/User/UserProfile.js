import React from 'react';
import UserComponent from './UserComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';

function UserProfile() {
  const additionalContent = (
    <FontAwesomeIcon icon={faCommentAlt} size="2x" />
  );
  return (
    <UserComponent
      avatar="https://avatars3.githubusercontent.com/u/3612017" //Data from DB
      name="Me" //Data from DB
      bold={true}
      additionalContent={additionalContent}
    />
  );
}

export default UserProfile;
