import React from "react";
import { useState } from "react";
import { EmailButton } from '../Auth/Signin/EmailButton.js';


function CommonForm({ onSubmit, buttonText, fields, showVerificationButton, setWarningMessage }) {
  const [emailMessage, setEmailMessage] = useState("전송");
  const [emailValue, setEmailValue] = useState("");


  const emailVerificationSend = async () => {
    setWarningMessage(``);
    setEmailMessage("전송 중");
    try {
      const response = await fetch("http://localhost:8080/api/auth/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
        }),
      });

      if (response.ok) {
        setEmailMessage("재전송");
      } else {
        const errorResponse = await response.json();
        setWarningMessage(errorResponse.error);
        setEmailMessage("전송");
      }
    } catch (error) {
      setWarningMessage(`${error.response.data.error}`);
      setEmailMessage("전송");
    }
  }

  const onValueChange = (e) => {
    setWarningMessage(``);
    setEmailValue(e.target.value);
  }

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
            onChange={field.name === "email" ? onValueChange : null}
            required
          />
          {field.name === "email" && showVerificationButton && (
            <EmailButton
              text={emailMessage}
              onClick={emailVerificationSend}
              email={emailValue}
              setWarningMessage={setWarningMessage}
            />
          )}
        </div>
      ))}
      <input type="submit" value={buttonText} className="login-button" />
    </form>
  );
}

export default CommonForm;
