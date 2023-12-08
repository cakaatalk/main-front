import React from "react";
import "../../css/components/friends.css";
import { FaPen } from "react-icons/fa";

function ProfileComponent({ avatar, name, subtitle, onEdit }) {
  return (
    <div className="user-component">
      <img src={avatar} className="user-component__avatar" alt={name} />
      <div className="user-component__name">
        <h4 className="user-component__title">{name}</h4>
        {subtitle && <p className="user-component__subtitle">{subtitle}</p>}
      </div>
      <button onClick={onEdit} className="user-component__edit-button">
        <FaPen />
      </button>
    </div>
  );
}

export default ProfileComponent;
