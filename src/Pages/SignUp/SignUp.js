import InputArea from "../../Components/Auth/Signin/InputArea";
import "../../css/components/loginPage.css";


function SignUp(){
    return (
        <div className="signUp-container">
          <header className="signUp-header">
            <InputArea isLoginView={0} />
            
          </header>
        </div>
      );
}

export default SignUp;