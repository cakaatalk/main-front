import InputArea from "../../Components/Auth/Signin/InputArea";
import AuthNavigation from "../../Components/Auth/AuthNavigation";
import "../../css/components/loginPage.css";

function LoginPage() {
  return (
    <div className="login-container">
      <header className="welcome-header">
    
        <InputArea isLoginView={1}/>
        <AuthNavigation isLoginView={1} />
      </header>
    </div>
  );
}
export default LoginPage;
