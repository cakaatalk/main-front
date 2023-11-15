import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import '../css/components/channel.css'; 

function ChannelSection() {
  const icons = [
    // This is where you'd add your icons or buttons
  ];

  return (
    <div className="friends-screen__channel">
      <div className="friends-screen__channel-header">
        {icons.map((icon, index) => (
          <FontAwesomeIcon key={index} icon={icon} size="xs" />
        ))}
        <span>Channel</span>
        <FontAwesomeIcon icon={faChevronUp} size="xs" />
      </div>
    </div>
  );
}

export default ChannelSection;
