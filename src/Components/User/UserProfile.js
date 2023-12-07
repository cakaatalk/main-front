import React, { useState, useEffect } from "react";
import UserComponent from "./UserComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import UserService from "../../API/UserService";
import AuthService from "../../API/AuthService";

function UserProfile() {
  const accessToken = localStorage.getItem("accessToken");

  const [isEditing, setIsEditing] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await UserService.searchProfile();
        if (response.data) {
          setSubtitle(response.data.comment);
          setUserProfile(response.data.imageURL);
          setUserName(response.data.name);
        }
      } catch (error) {
        try {
          const refreshResponse = await AuthService.refreshAccessToken();
          localStorage.setItem("accessToken", refreshResponse.data.accessToken);
          fetchProfile();
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      }
    }

    fetchProfile();
  }, [accessToken]);

  const additionalContent = <FontAwesomeIcon icon={faCommentAlt} size="2x" />;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubtitleChange = (e) => {
    setSubtitle(e.target.value);
  };

  const handleSave = async () => {
    setIsEditing(false);
    await UserService.updateProfile(userProfile, subtitle);
  };

  return (
    <UserComponent
      avatar={userProfile}
      name={userName}
      subtitle={
        isEditing ? (
          <input
            type="text"
            value={subtitle}
            onChange={handleSubtitleChange}
            onBlur={handleSave}
          />
        ) : (
          subtitle
        )
      }
      bold={true}
      additionalContent={additionalContent}
      onEdit={handleEdit}
    />
  );
}

export default UserProfile;
