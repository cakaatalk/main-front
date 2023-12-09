import React, { useState } from "react";
// import "../../css/components/friends.css";
import ProfileUpdate from "./ProfileUpdate";
import Pen from "../../assets/pen-icon.png";

function ProfileComponent({ avatar, name, subtitle, onEdit }) {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="user-component">
      <img src={avatar} className="user-component__avatar" alt={name} />
      <div className="user-component__name">
        <h4 className="user-component__title">{name}</h4>
        {subtitle && <p className="user-component__subtitle">{subtitle}</p>}
      </div>
      <button onClick={() => setShowPopup(true)}>Open Popup</button>
      {showPopup && (
        <ProfileUpdate
          onClose={() => setShowPopup(false)}
          origin_image={avatar}
          name={name}
          origin_comment={subtitle}
        />
      )}
      {/* <button onClick={onEdit} className="user-component__edit-button">
        <img src={Pen} alt="Edit" />
      </button> */}
    </div>
  );
}

export default ProfileComponent;
