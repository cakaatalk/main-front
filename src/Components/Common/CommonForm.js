import React from "react";
import { useState } from "react";
import { EmailButton } from '../Auth/Signin/EmailButton.js';


function CommonForm({ onSubmit, buttonText, fields, showVerificationButton }) {
  const [emailMessage, setEmailMessage] = useState("전송");

  const emailVerificationSend = () => {
    setEmailMessage("재전송");
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
            required
          />
          {field.name === "email" && showVerificationButton && (
            <EmailButton
              text={emailMessage}
              onClick={emailVerificationSend}
            />
          )}
        </div>
      ))}
      <input type="submit" value={buttonText} className="login-button" />
    </form>
  );
}

export default CommonForm;
