import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faBatteryFull, faBatteryHalf, faBatteryQuarter, faBatteryEmpty, faBolt } from '@fortawesome/free-solid-svg-icons';
import './css/styles.css';
import kakaoIcon from './assets/kakao-icon.png'; 

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    navigator.getBattery().then(battery => {
      const updateBatteryInfo = () => {
        setBatteryLevel((battery.level * 100).toFixed(0));
        setIsCharging(battery.charging);
      };

      updateBatteryInfo();

      battery.addEventListener('levelchange', updateBatteryInfo);
      battery.addEventListener('chargingchange', updateBatteryInfo);

      return () => {
        clearInterval(interval);
        battery.removeEventListener('levelchange', updateBatteryInfo);
        battery.removeEventListener('chargingchange', updateBatteryInfo);
      };
    });

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const findAccount = () => {
  };

  const getBatteryIcon = () => {
    if (isCharging) {
      return faBolt;
    }
    if (batteryLevel > 75) {
      return faBatteryFull;
    } else if (batteryLevel > 50) {
      return faBatteryHalf;
    } else if (batteryLevel > 25) {
      return faBatteryQuarter;
    } else {
      return faBatteryEmpty;
    }
  };

  return (
    <div>
      <div className="status-bar">

        <div className="status-bar__column">
          <span>{formatTime(currentTime)}</span>
        </div>

        <div className="status-bar__column">
          <span>{batteryLevel !== null ? `${batteryLevel}%` : 'Loading...'}</span>
          <FontAwesomeIcon icon={getBatteryIcon()} size="lg" />
        </div>
      </div>

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
  );
}

export default App;
