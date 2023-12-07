import axios from "axios";

const API_User_URL = "http://localhost:8080/api/user";
const accessToken = localStorage.getItem("accessToken");

const UserService = {
  getFriendList: async () => {
    return axios.get(`${API_User_URL}/friends`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
  },
  getAllUserList: async () => {
    return axios.get(`${API_User_URL}/findAll`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
  },
  searchProfile: async () => {
    return axios.get(`${API_User_URL}/profile`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
  },
  searchUser: async (name) => {
    return axios.get(`${API_User_URL}/searchUser?name=${name}`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
  },
  addFriend: async (friendId) => {
    return axios.post(
      `${API_User_URL}/addFriend`,
      {
        friendId: friendId,
      },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
  },
  updateProfile: async (img, comment) => {
    return axios.post(
      `${API_User_URL}/updateProfile`,
      {
        imageUrl: `${img}`,
        comment: `${comment}`,
      },
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );
  },
};

export default UserService;
