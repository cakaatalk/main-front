import WarningMessage from "../../Common/WarningMessage";
import authService from "../../../API/AuthService";
import CommonForm from "../../Common/CommonForm";

import { useState, useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";

function InputArea(props) {
  const [warningMessage, setWarningMessage] = useState("");
  const VERIFICATION_SEND = true;
  const { signIn } = useContext(AuthContext);

  const loginHandler = async (e) => {

    const { email, password } = e.target.elements;
    const userData = {
      email: email.value,
      password: password.value,
    };

    try {
      const response = await authService.login(userData);
      if (response) {
        signIn(response, userData);
        window.location.href = "/main";
      } else {
        throw new Error("No access token received");
      }
    } catch (error) {
      setWarningMessage(`${error.response.data.error}`);
    }
  };

  const signUpHandler = async (e) => {
    const { name, email, password } = e.target.elements;
    const userData = {
      user_name: name.value,
      email: email.value,
      password: password.value,
    };
    try {
      const response = await authService.signUp(userData);
      if (response) {

        signIn(response, userData);
        window.location.href = "/main";
      } else {
        throw new Error("No access token received");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setWarningMessage(`${error.response.data.error}`);
      } else {
        setWarningMessage('An unexpected error occurred');
        console.error(error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.isLoginView === 1 ? loginHandler(e) : signUpHandler(e);
  };

  return (
    <>
      <h1 className="login-header">
        {props.isLoginView === 1
          ? "Hello, CaKaA-Talk"
          : "Welcome, CaKaA-Talk"}
      </h1>
      {props.isLoginView === 1 ? (
        <CommonForm
          onSubmit={handleSubmit}
          buttonText="로그인"
          fields={[
            {
              name: "email",
              type: "text",
              placeholder: "Ajou University Email (@ajou.ac.kr)",
              className: "input-email",
            },
            {
              name: "password",
              type: "password",
              placeholder: "password",
              className: "input-password",
            },
          ]}
        />
      ) : (
        <CommonForm
          onSubmit={handleSubmit}
          buttonText="회원가입"
          fields={[
            {
              name: "name",
              type: "text",
              placeholder: "Name",
              className: "input-name",
            },
            {
              name: "email",
              type: "text",
              placeholder: "Ajou University Email (@ajou.ac.kr)",
              className: "input-email verify-email",
            },
            {
              name: "password",
              type: "password",
              placeholder: "password",
              className: "input-password",
            },
          ]}
          showVerificationButton={VERIFICATION_SEND}
        />
      )}
      {warningMessage && <WarningMessage message={warningMessage} />}
    </>
  );
}

export default InputArea;
