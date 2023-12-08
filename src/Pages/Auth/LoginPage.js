import InputArea from "../../Components/Auth/Signin/InputArea";
import AuthNavigation from "../../Components/Auth/AuthNavigation";
import "../../css/components/loginPage.css";
function LoginPage() {
  return (
    <div className="login-container">
      <header className="welcome-header">
        <h1 className="login-header">"CaKaA Talk 로그인"</h1>
        <InputArea />
        <AuthNavigation isLoginView={1} />
      </header>
    </div>
  );
}
export default LoginPage;
