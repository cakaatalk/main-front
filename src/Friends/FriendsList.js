import React from 'react';
import UserComponent from '../User/UserComponent';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { friendsData } from './friendsData.js';
import { useEffect, useState } from 'react';

import "../css/components/friendList.css"


function FriendsList() {
  const additionalContent = <FontAwesomeIcon icon={faCommentAlt} size="2x" />;
  const [maxHeight, setMaxHeight] = useState('auto');

  useEffect(() => {
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
        <h2 className="friends-list-title">친구{friendsData.length}</h2>
      </div>
      <div className="friends-divider"></div>
      <div className="friends-list">
        {friendsData.map(friend => (
          <UserComponent
            key={friend.id}
            avatar={friend.avatar}
            name={friend.name}
            bold={true}
            additionalContent={additionalContent}
          />
        ))}
      </div>
    </div>
  );
}

export default FriendsList;