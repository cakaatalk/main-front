import React, { useState, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; 
import authService from '../AuthService'; 
import WarningMessage from './WarningMessage';

import '../css/components/loginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

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
    const { username,  email, password } = e.target.elements;
    const userData = {
      user_name : isLoginView ? "" : username.value,
      email: email.value,
      password: password.value,
    };


    if(isLoginView){
      try {
        const response = await authService.login(userData);
        if (response.data.accessToken) {
          signIn(response.data.accessToken, userData);
          
          navigate('/friends');
        } else {
          throw new Error('No access token received');
        }
      } catch (error) {
        setWarningMessage(`${error.response.data.error}`);
      }
    }
    else{
      try {
        const response = await authService.signUp(userData);
        if (response.data.accessToken) {
          signIn(response.data.accessToken, userData);
          
          navigate('/friends');
        } else {
          throw new Error('No access token received');
        }
      } catch (error) {
        console.log(error)
        setWarningMessage(`${error.response.data.error}`);
      }
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
          {isLoginView ? "아주대학교 이메일로 로그인 할 수 있습니다." : "새로운 계정을 만드세요."}
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