import WarningMessage from "../../Common/WarningMessage";
import authService from "../../../API/AuthService";
import CommonForm from "../../Common/CommonForm";

import { useState, useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";

function InputArea(props) {
  const [warningMessage, setWarningMessage] = useState("");
  const { signIn } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    props.isLoginView ? (
      async () => {
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
      }
    )() : (
      async () => {
        const { name, email, password } = e.target.elements;
        const userData = {
          user_name: name.value,
          email: email.value,
          password: password.value,
        };
        try {
          const response = await authService.signUp(userData);
          if (response.data.accessToken) {
            signIn(response.data.accessToken, userData);
            window.location.href = "/main";
          } else {
            throw new Error("No access token received");
          }
        } catch (error) {
          setWarningMessage(`${error.response.data.error}`);
        }
      }
    )();
  } 

  return (
    <>
      <h1 className="login-header">
        {props.isLoginView === 1 ? "\"CaKaA Talk 로그인\"" : "\"CaKaA Talk 회원가입"}
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
      )}
      {warningMessage && <WarningMessage message={warningMessage} />}
    </>
  );
  
}

export default InputArea;
