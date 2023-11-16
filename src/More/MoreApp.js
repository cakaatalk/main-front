import React from 'react';
import ScreenHeader from './ScreenHeader';
import UserProfile from './UserProfile';
import IconRow from './IconRow';
import Suggestions from './Suggestions';
import NavigationBar from '../Common/NavigationBar';
import StatusBar from '../Common/StatusBar';

import '../css/components/moreApp.css';
function MoreApp() {
  return (
    <div>
      <StatusBar />
  
      <ScreenHeader />

      <main className="main-screen more-screen">
        <UserProfile />
        <IconRow />
        <Suggestions />
      </main>

      <NavigationBar />

      <div id="no-mobile">
        
      </div>
    </div>
  );
}

export default MoreApp;
