import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './css/components/friends.css'; 

function ChannelSection() {
  return (
    <div className="friends-screen__channel">
      <div className="friends-screen__channel-header">
        <span>Channel</span>
        <FontAwesomeIcon icon={faChevronUp} size="xs" />
      </div>
    </div>
  );
}

export default ChannelSection;
