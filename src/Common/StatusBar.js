import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useTimeAndBattery from '../Common/UseTimeAndBattery';

function StatusBar() {
  const { currentTime, batteryLevel, getBatteryIcon } = useTimeAndBattery();

  const formatTime = (date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="status-bar">
      <div className="status-bar__column">
        <span>{formatTime(currentTime)}</span>
      </div>
      <div className="status-bar__column">
        <span>{batteryLevel !== null ? `${batteryLevel}%` : 'Loading...'}</span>
        <FontAwesomeIcon icon={getBatteryIcon()} size="lg" />
      </div>
    </div>
  );
}

export default StatusBar;
