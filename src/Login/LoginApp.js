import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/components/loginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);

  const handleToggleView = () => {
    setIsLoginView(!isLoginView);
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
      console.error('An error occurred:', error);
    }
  };
  
  return (
    <div className="login-container">
      <header className="welcome-header">
        <h1 className="login-header">{isLoginView ? "CaKaA Talk 로그인" : "회원가입"}</h1>
        <p className="login-description">
          {isLoginView ? "아주대학교 이메일로 로그인 할 수 있습니다." : "새 계정을 생성하세요."}
        </p>
        <form onSubmit={handleSubmit} id="login-form">
          {!isLoginView && (
            <input name="username" type="text" placeholder="사용자 이름" className="input-username" required />
          )}
          <br></br>
          <input name="email" type="text" placeholder="아주대학교 이메일(@ajou.ac.kr)" className="input-email" required />
          <input name="password" type="password" placeholder="비밀번호" className="input-password" required />
          <input type="submit" value={isLoginView ? "Log In" : "Sign Up"} className="login-button" />
        </form>
        <div className="additional-options">
          <span onClick={handleToggleView} role="button" tabIndex={0} className="text-button">
            {isLoginView ? "회원가입" : "로그인으로 돌아가기"}
          </span>
          <span className="text-separator">/</span>
          <span onClick={() => { /* Logic for finding ID */ }} role="button" tabIndex={0} className="text-button">
            아이디 찾기
          </span>
        </div>
      </header>
    </div>
  );
}

export default LoginPage;