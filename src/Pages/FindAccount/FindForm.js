import React from "react";
import { useState } from "react";
import { EmailButton } from "../../Components/Auth/Signin/EmailButton";
import authService from "../../API/AuthService";

function FindForm({
  onSubmit,
  buttonText,
  fields,
  showVerificationButton,
  setWarningMessage,
}) {
  const [emailMessage, setEmailMessage] = useState("전송");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [disableValue, setDisableValue] = useState(false);
  const [viewable, setViewable] = useState("none");

  const changePasswordHandler = async (e) => {
    try {
      const response = await authService.mailUpdatePassword(
        emailValue,
        passwordValue
      );
      if (response.ok) {
        window.location.href = "/";
        alert("비밀번호 변경이 완료됐습니다.");
      } else {
        const errorResponse = await response.json();
        setWarningMessage(errorResponse.error);
      }
    } catch (error) {
      setWarningMessage(`${error.response.data.error}`);
    }
  };

  const emailVerificationSend = async () => {
    setWarningMessage(``);
    setEmailMessage("전송 중");
    setDisableValue(true);
    try {
      const response = await authService.mailPassword(
        emailValue,
        passwordValue
      );
      if (response.ok) {
        setEmailMessage("재전송");
        setDisableValue(false);
      } else {
        const errorResponse = await response.json();
        setWarningMessage(errorResponse.error);
        setEmailMessage("전송");
        setDisableValue(false);
      }
    } catch (error) {
      setWarningMessage(`${error.response.data.error}`);
      setEmailMessage("전송");
      setDisableValue(false);
    }
  };

  const onEmailChange = (e) => {
    setWarningMessage(``);
    setEmailValue(e.target.value);
  };

  const onPasswordChange = (e) => {
    setWarningMessage(``);
    setPasswordValue(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <div>
          <input
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            className={field.className}
            onChange={field.name === "email" ? onEmailChange : onPasswordChange}
            style={{ display: field.name === "password" ? viewable : "block" }}
            required
          />
          {field.name === "email" && showVerificationButton && (
            <EmailButton
              text={emailMessage}
              onClick={emailVerificationSend}
              email={emailValue}
              setWarningMessage={setWarningMessage}
              viewable={viewable}
              setViewable={setViewable}
              disableValue={disableValue}
              setDisableValue={setDisableValue}
            />
          )}
        </div>
      ))}
      <input
        type="submit"
        value={buttonText}
        style={{ display: viewable }}
        onClick={changePasswordHandler}
        className="login-button"
      />
    </form>
  );
}

export default FindForm;
