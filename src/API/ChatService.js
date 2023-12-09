import axios from "axios";

const API_User_URL = "http://localhost:8080/api/chat";
const accessToken = localStorage.getItem("accessToken");

const ChatService = {
  getPersonalRoomId: async (userId) => {
    return axios.get(`${API_User_URL}/roomId/${userId}`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
  },
  getRoomList: async () => {
    return axios.get(`${API_User_URL}/roomlist`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
  }
};

export default ChatService;
