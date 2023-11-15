import React from 'react';
import { useNavigate } from 'react-router-dom';
import kakaoIcon from '../assets/kakao-icon.png';

function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/friends'); 
  };
  
  const findAccount = () => {
    };

  return (
    <header className="welcome-header">
      <img src={kakaoIcon} alt="Kakao Icon" className="icon"/>
      <h1 className="welcome-header__title">Welcome to CaKaA Talk</h1>
      <p className="welcome-header__text">
        If you have a Kokoa Account, log in with your email or phone number.
      </p>
      <form onSubmit={handleSubmit} id="login-form">
        <input name="username" type="text" placeholder="Email or phone number" required />
        <input name="password" type="password" placeholder="Password" required />
        <input type="submit" value="Log In" />
      
        
        <div id="no-mobile">
              
        </div>
      </form>
    </header>
  );
}

export default LoginPage;
