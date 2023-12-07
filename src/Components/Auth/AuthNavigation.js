function AuthNavigation({ isLoginView }) {
  return (
    <div className="additional-options">
      <span
        // onClick={handleToggleView}
        role="button"
        tabIndex={0}
        className="text-button"
      >
        {isLoginView ? "회원가입" : "로그인으로 돌아가기"}
      </span>
      <span className="text-separator">/</span>
      <span
        // onClick={handleFindIdView}
        role="button"
        tabIndex={0}
        className="text-button"
      >
        아이디 찾기
      </span>
      <span className="text-separator">/</span>
      <span
        // onClick={handleFindPasswordView}
        role="button"
        tabIndex={0}
        className="text-button"
      >
        패스워드 찾기
      </span>
    </div>
  );
}

export default AuthNavigation;
