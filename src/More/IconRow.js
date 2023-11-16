import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

function IconRow() {
  return (
    <div className="icon-row">
      <div className="icon-row__icon">
        <FontAwesomeIcon icon={faCalendar} />
        <span>Calendar</span>
      </div>
    </div>
  );
}

export default IconRow;
