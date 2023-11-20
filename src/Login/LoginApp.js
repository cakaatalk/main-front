import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../assets/ajou-icon.png';

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
      <img src={Icon} alt="Kakao Icon" className="icon"/>
      <h1 className="welcome-header__title">CaKaA Talk 로그인</h1>
      <p className="welcome-header__text">
        아주대학교 이메일로 로그인 할 수 있습니다.
      </p>
      <form onSubmit={handleSubmit} id="login-form">
        <input name="username" type="text" placeholder="아주대학교 이메일(@ajou.ac.kr)" required />
        <input name="password" type="password" placeholder="비밀번호" required />
        <input type="submit" value="Log In" />
      
        
        <div id="no-mobile">
              
        </div>
      </form>
    </header>
  );
}

export default LoginPage;
