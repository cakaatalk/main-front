import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, } from '@fortawesome/free-solid-svg-icons';
import useTimeAndBattery from './UseTimeAndBattery';
import StatusBar from './StatusBar';
import NavigationBar from './NavigationBar';
import FriendsHeader from './FriendsHeader';
import FriendsDisplayLink from './FriendsDisplayLink';
import FriendsList from './FriendsList';
import ChannelSection from './ChannelSection';

import './css/components/styles.css';

function FriendApp() {
  const { currentTime, batteryLevel, getBatteryIcon } = useTimeAndBattery();

  return (
    <div>
      <StatusBar currentTime={currentTime} batteryLevel={batteryLevel} getBatteryIcon={getBatteryIcon} />

      <FriendsHeader />

      <main className="friends-screen">
        <FriendsList />
        <ChannelSection />
      </main>

      <NavigationBar />

      <div id="splash-screen">
        <FontAwesomeIcon icon={faComment} />
      </div>

      <div id="no-mobile">
        
      </div>
    </div>
  );
}

export default FriendApp;
