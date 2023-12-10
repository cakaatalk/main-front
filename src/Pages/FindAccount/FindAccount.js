import { FindAccountArea } from "../FindAccount/FindAccountArea";
import "../../css/components/loginPage.css";

function FindAccount() {

    return (
        <div className="login-container">
            <header className="welcome-header">

                <FindAccountArea />
                {/* <AuthNavigation isLoginView={0} /> */}
            </header>
        </div>
    );
}

export default FindAccount;