import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faBatteryFull, faBolt } from '@fortawesome/free-solid-svg-icons';
import './css/styles.css'; // CSS 파일의 경로를 확인해주세요.

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직을 추가하세요.
  };

  const findAccount = () => {
    // 계정 찾기 로직을 추가하세요.
  };

  return (
    <div>
      <div className="status-bar">
        <div className="status-bar__column">
          <span>No Service</span>
          <FontAwesomeIcon icon={faWifi} />
        </div>
        <div className="status-bar__column">
          <span>18:43</span>
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
