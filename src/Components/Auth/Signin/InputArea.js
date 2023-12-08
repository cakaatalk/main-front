import WarningMessage from "../../Common/WarningMessage";
import { useState, useContext } from "react";
import authService from "../../../API/AuthService";
import { AuthContext } from "../../../Contexts/AuthContext";
function InputArea() {
  const [warningMessage, setWarningMessage] = useState("");
  const { signIn } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const userData = {
      email: email.value,
      password: password.value,
    };
    try {
      const response = await authService.login(userData);
      if (response.data.accessToken) {
        signIn(response.data.accessToken, userData);

        window.location.href = "/main";
      } else {
        throw new Error("No access token received");
      }
    } catch (error) {
      setWarningMessage(`${error.response.data.error}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="login-form">
        <input
          name="email"
          type="text"
          placeholder="Ajou University Email (@ajou.ac.kr)"
          className="input-email"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="input-password"
          required
        />
        <input type="submit" value="로그인" className="login-button" />
      </form>
      {warningMessage && <WarningMessage message={warningMessage} />}
    </>
  );
}

export default InputArea;
