import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faBatteryFull, faBolt } from '@fortawesome/free-solid-svg-icons';
import './css/styles.css';

function App() {
  // State for current time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date()); // Update current time every second
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  // Function to format the time as HH:MM
  const formatTime = (date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login handling logic here
  };

  const findAccount = () => {
    // Add find account logic here
  };

  return (
    <div>
      <div className="status-bar">
        <div className="status-bar__column">
          <span>No Service</span>
          <FontAwesomeIcon icon={faWifi} />
        </div>
        <div className="status-bar__column">
          <span>{formatTime(currentTime)}</span> {/* Display the current time */}
        </div>
        <div className="status-bar__column">
          <span>110%</span>
          <FontAwesomeIcon icon={faBatteryFull} size="lg" />
          <FontAwesomeIcon icon={faBolt} />
        </div>
      </div>

      <header className="welcome-header">
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
        <span>Your screen is too big ㅠㅠ</span>
      </div>
    </div>
  );
}

export default App;
