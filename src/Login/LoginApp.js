import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Icon from '../assets/ajou-icon.png';
import '../css/components/loginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [isTestMode, setIsTestMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password } = e.target.elements;
    const userData = {
      email: email.value,
      user_name: isLoginView ? null : username.value,
      password: password.value,
    };

    if (!isTestMode) {
      try {
        if (isLoginView) {
          await axios.post('http://localhost:8080/login', userData);
        } else {
          await axios.post('http://localhost:8080/signup', userData);
        }
        navigate('/friends');
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } else {
      console.log('Test Mode Active:', userData);
      navigate('/friends');
    }
  };

  return (
    <header className="welcome-header">
      <img src={Icon} alt="Cocoa Icon" className="icon"/>
      <h1 className="welcome-header__title">{isLoginView ? "CaKaA Talk 로그인" : "회원가입"}</h1>
      <p className="welcome-header__text">
        {isLoginView ? "아주대학교 이메일로 로그인 할 수 있습니다." : "새 계정을 생성하세요."}
      </p>
      <form onSubmit={handleSubmit} id="login-form">
        {isLoginView ? (
          <>
            <input name="email" type="text" placeholder="email@ajou.ac.kr" required />
            <input name="password" type="password" placeholder="비밀번호" required />
          </>
        ) : (
          <>
            <input name="email" type="text" placeholder="email@ajou.ac.kr" required />
            <input name="username" type="text" placeholder="name" required />
            <input name="password" type="password" placeholder="비밀번호" required />
          </>
        )}
        <input type="submit" value={isLoginView ? "Log In" : "Sign Up"} />
      </form>
      <button onClick={() => setIsLoginView(!isLoginView)}>
        {isLoginView ? "회원가입" : "로그인으로 돌아가기"}
      </button>
      <button onClick={() => setIsTestMode(!isTestMode)}>
        {isTestMode ? "Disable Test Mode" : "Enable Test Mode"}
      </button>
    </header>
  );
}

export default LoginPage;