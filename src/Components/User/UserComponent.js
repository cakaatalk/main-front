import React from "react";
import env from "../Common/dotenv"
import "../../css/components/userProfile.css";

function UserComponent({ avatar, name, subtitle, additionalContent }) {
  console.log(additionalContent);
  const content =
    typeof additionalContent === "function"
      ? additionalContent()
      : additionalContent;

  return (
    <div className="user-component-container">
      <div className="user-component">
        <img
          src={
            !avatar
              ? `${env.REACT_APP_IMAGE_BASE_URL}/uploads/default-profile.png`
              : avatar
          }
          className="user-component__avatar"
          alt={name}
        />
        <div className="user-component__name">
          <h4 className="user-component__title">{name}</h4>
          {subtitle && <p className="user-component__subtitle">{subtitle}</p>}
        </div>
        {content && <div className="user-component__additional">{content}</div>}
      </div>
    </div>
  );
}

export default UserComponent;
