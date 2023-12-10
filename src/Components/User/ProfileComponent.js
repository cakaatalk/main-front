import React, { useState } from "react";
import ProfileUpdate from "./ProfileUpdate";
import Pen from "../../assets/pen-icon.png";

function ProfileComponent({ avatar, name, subtitle, onEdit }) {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="profile-component">
      <img src={avatar} className="user-component__avatar" alt={name} />
      <div className="user-component__name">
        <h4 className="user-component__title">{name}</h4>
        {subtitle && <p className="user-component__subtitle">{subtitle}</p>}
      </div>
      <button
        onClick={() => setShowPopup(true)}
        className="edit-button"
        style={{ background: "transparent", border: "none" }}
      >
        <img src={Pen} alt="Edit" height="37" />
      </button>

      {showPopup && (
        <ProfileUpdate
          onClose={() => setShowPopup(false)}
          origin_image={avatar}
          name={name}
          origin_comment={subtitle}
        />
      )}
    </div>
  );
}

export default ProfileComponent;
