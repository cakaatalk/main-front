import React, { useState, useEffect } from "react";
import UserService from "../../API/UserService";
import AuthService from "../../API/AuthService";
import ProfileComponent from "./ProfileComponent";

function UserProfile() {
  const accessToken = localStorage.getItem("accessToken");

  const [subtitle, setSubtitle] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await UserService.searchProfile();
        if (response) {
          setSubtitle(response.comment);
          if (response.profileImage == null || response.profileImage == "") {
            setUserProfile("http://localhost:8040/uploads/default-profile.png");
          } else {
            setUserProfile(response.profileImage);
          }
          setUserName(response.name);
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

  return (
    <ProfileComponent
      avatar={userProfile}
      name={userName}
      subtitle={subtitle}
    />
  );
}

export default UserProfile;
