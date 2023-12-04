import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/components/loginPage.css';
import WarningMessage from './WarningMessage'; 

function LoginPage() {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [isFindIdView, setIsFindIdView] = useState(false);
  const [isFindPasswordView, setIsFindPasswordView] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const handleToggleView = () => {
    setIsLoginView(!isLoginView);
    setIsFindIdView(false);
    setIsFindPasswordView(false);
    setWarningMessage('');
  };

  const handleFindIdView = () => {
    setIsFindIdView(true);
    setIsFindPasswordView(false);
    setIsLoginView(false);
    setWarningMessage('');
  };

  const handleFindPasswordView = () => {
    setIsFindPasswordView(true);
    setIsFindIdView(false);
    setIsLoginView(false);
    setWarningMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password } = e.target.elements;
    const userData = {
      email: email.value,
      user_name: isLoginView ? null : username.value,
      password: password.value,
    };
  
    const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/signup';
    const apiUrl = `http://localhost:8080${endpoint}`;
  
    try {
      await axios.post(apiUrl, userData);
      navigate('/friends');
    } catch (error) {
      isLoginView ? setWarningMessage('ID가 없습니다.') : setWarningMessage('이미 존재하는 ID입니다.');
    }
    
  };
  
  if (isFindIdView) {
    return <div>ID 찾기</div>;
  }

  if (isFindPasswordView) {
    return <div>PWD 찾기</div>;
  }

  return (
    <div className="login-container">
      <header className="welcome-header">
        <h1 className="login-header">{isLoginView ? "CaKaA Talk 로그인" : "회원가입"}</h1>
        <p className="login-description">
          {isLoginView ? "You can log in with your Ajou University email address." : "새로운 계정을 만드세요."}
        </p>
        <form onSubmit={handleSubmit} id="login-form">
          {!isLoginView && (
            <input name="username" type="text" placeholder="username" className="input-username" required />
          )}
          <br></br>
          <input name="email" type="text" placeholder="Ajou University Email (@ajou.ac.kr)" className="input-email" required />
          <input name="password" type="password" placeholder="password" className="input-password" required />
          <input type="submit" value={isLoginView ? "로그인" : "회원가입"} className="login-button" />
        </form>
        {warningMessage && <WarningMessage message={warningMessage} />}
        <div className="additional-options">
          <span onClick={handleToggleView} role="button" tabIndex={0} className="text-button">
            {isLoginView ? "회원가입" : "로그인으로 돌아가기"}
          </span>
          <span className="text-separator">/</span>
          <span onClick={handleFindIdView} role="button" tabIndex={0} className="text-button">
            아이디 찾기
          </span>
          <span className="text-separator">/</span>
          <span onClick={handleFindPasswordView} role="button" tabIndex={0} className="text-button">
            패스워드 찾기
          </span>
        </div>
      </header>
    </div>
  );
}

export default LoginPage;