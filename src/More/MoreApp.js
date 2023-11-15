import React from 'react';
import '../css/components/moreApp.css';
import ScreenHeader from './ScreenHeader';
import UserProfile from './UserProfile';
import IconRow from './IconRow';
import Suggestions from './Suggestions';
import NavigationBar from '../Common/NavigationBar';

function MoreApp() {
  return (
    <div>
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
