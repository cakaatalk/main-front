import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import kakaoIcon from './assets/kakao-icon.png'; 
import FriendApp from './FriendApp'; 
import StatusBar from './StatusBar';
import useTimeAndBattery from './UseTimeAndBattery';

import './css/components/styles.css'

function App() {
  const { currentTime, batteryLevel, getBatteryIcon } = useTimeAndBattery();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/friends'); 
  };


  const findAccount = () => {
  };


  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={
          <div>
            <StatusBar currentTime={currentTime} batteryLevel={batteryLevel} getBatteryIcon={getBatteryIcon} />

            <header className="welcome-header">
              <img src={kakaoIcon} alt="Kakao Icon" className="icon"/>
              <h1 className="welcome-header__title">Welcome to CaKaA Talk</h1>
              <p className="welcome-header__text">
                If you have a Kokoa Account, log in with your email or phone number.
              </p>
            </header>

            <form onSubmit={handleSubmit} id="login-form">
              <input name="username" type="text" placeholder="Email or phone number" required />
              <input name="password" type="password" placeholder="Password" required />
              <input type="submit" value="Log In" />
              <button type="button" onClick={findAccount} className="link-like-button">
                Find Kokoa Account or Password
              </button>
            </form>

            <div id="no-mobile">
              
            </div>
          </div>
        } />
        <Route path="/friends" element={<FriendApp />} /> 
        </Routes>
      </BrowserRouter>
  );
}

export default App;
