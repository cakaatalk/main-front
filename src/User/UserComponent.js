import React from 'react';
import '../css/components/friends.css';
import { FaPen } from "react-icons/fa";

function UserComponent({ avatar, name, subtitle, additionalContent, onEdit }) {
  
  return (
    <div className="user-component">
      <img src={avatar} className="user-component__avatar" alt={name} />
      <div className="user-component__name">
        <h4 className="user-component__title">{name}</h4>
        {subtitle && <p className="user-component__subtitle">{subtitle}</p>}
      </div>
        {onEdit && (
          <button onClick={onEdit} className="user-component__edit-button">{<FaPen/>}</button>
        )}
      {additionalContent && (
        <div className="user-component__additional">
          {additionalContent}
        </div>
        
      )}
    </div>
    
  );
}

export default UserComponent;