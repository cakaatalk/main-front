const API_User_URL = "http://localhost:8080/api/user";
const accessToken = localStorage.getItem("accessToken");


const UserService = {
  getFriendList: async () => {
    try {
      const response = await fetch(`${API_User_URL}/friends`, {
        method: "GET",
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  getAllUserList: async () => {
    try {
      const response = await fetch(`${API_User_URL}/findAll`, {
        method: "GET",
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  searchProfile: async () => {
    try {
      const response = await fetch(`${API_User_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  searchUser: async (name) => {
    try {
      const response = await fetch(`${API_User_URL}/searchUser?name=${name}`, {
        method: "GET",
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  addFriend: async (friendId) => {
    try {
      const response = await fetch(`${API_User_URL}/addFriend`, {
        method: "POST",
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendId: friendId,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async (img, comment) => {
    try {
      const response = await fetch(`${API_User_URL}/updateProfile`, {
        method: "POST",
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: img,
          comment: comment,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

export default UserService;
