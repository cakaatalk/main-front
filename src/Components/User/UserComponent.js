import React from "react";
import "../../css/components/userProfile.css";

function UserComponent({ avatar, name, subtitle, additionalContent }) {
  return (
    <div className="user-component-container">
    <div className="user-component">
      <img src={avatar} className="user-component__avatar" alt={name} />
      <div className="user-component__name">
        <h4 className="user-component__title">{name}</h4>
        {subtitle && <p className="user-component__subtitle">{subtitle}</p>}
      </div>
      {additionalContent && (
        <div className="user-component__additional">{additionalContent}
          {typeof additionalContent === "function" ? additionalContent() : additionalContent}
        </div>
       
      )}
      
    </div>
    
    </div>
  );
  
}

export default UserComponent;
