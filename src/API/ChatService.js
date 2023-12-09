import axios from "axios";

const API_User_URL = "http://localhost:8080/api/chat";
const accessToken = localStorage.getItem("accessToken");

const ChatService = {
  getPersonalRoomId: async (userId) => { 
    const response = await fetch(`${API_User_URL}/roomId/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
      },
    });
    const data = await response.json();
    return data.room_id; 
  },
  getRoomList: async () => {
    const response = await fetch(`${API_User_URL}/roomlist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data; 
  }
};

export default ChatService;
