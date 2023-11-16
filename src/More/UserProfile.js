import React from 'react';
import UserComponent from '../User/UserComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import '../css/components/friends.css';

function UserProfile() {
  const additionalContent = (
    <FontAwesomeIcon icon={faCommentAlt} size="2x" />
  );

  return (
    <UserComponent
      avatar="https://avatars3.githubusercontent.com/u/3612017"
      name="Nicolas"
      bold={true}
      //additionalContent={additionalContent}
    />
  );
}

export default UserProfile;
