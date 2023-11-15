import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import FriendApp from './Friends/FriendApp'; 
import StatusBar from './Common/StatusBar';
import LoginPage from './Login/LoginPage'; 
import useTimeAndBattery from './Common/UseTimeAndBattery';

import './css/components/styles.css'

function App() {
  const { currentTime, batteryLevel, getBatteryIcon } = useTimeAndBattery();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <StatusBar currentTime={currentTime} batteryLevel={batteryLevel} getBatteryIcon={getBatteryIcon} />
            <LoginPage />
          </div>
        } />
        <Route path="/friends" element={<FriendApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
