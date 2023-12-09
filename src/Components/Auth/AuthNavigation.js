function AuthNavigation({ isLoginView }) {
  return (
    <div className="additional-options">
      <span
        onClick={() => {
          isLoginView ? window.location.href = "/signUp" : window.location.href = "/";
        }}
        role="button"
        tabIndex={0}
        className="text-button"
      >
        {isLoginView ? "회원가입" : "로그인으로 돌아가기"}
      </span>

      <span
        onClick={() => {
          window.location.href = "/findAccount";
        }}
        role="button"
        tabIndex={0}
        className="text-button"
      >
        {isLoginView ? "비밀번호 찾기" : ""}
      </span>
    </div>
  );
}

export default AuthNavigation;
