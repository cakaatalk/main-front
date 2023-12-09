function AuthNavigation() {
  return (
    <div className="additional-options">
      <span
        onClick={() => {
          window.location.href = "/signUp";
        }}
        role="button"
        tabIndex={0}
        className="text-button"
      >
        회원가입
      </span>

      <span
        onClick={() => {
          window.location.href = "/findAccount";
        }}
        role="button"
        tabIndex={0}
        className="text-button"
      >
        비밀번호 찾기
      </span>
    </div>
  );
}

export default AuthNavigation;
