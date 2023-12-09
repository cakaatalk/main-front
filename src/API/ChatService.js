import env from '../Components/Common/dotenv';

const API_User_URL = env.REACT_APP_API_BASE_URL + "/chat";
const accessToken = localStorage.getItem("accessToken");

const ChatService = {
  getRoomId: async (users) => { 
    const response = await fetch(`${API_User_URL}/roomId`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
      },
      body : JSON.stringify({
        userIds : users,
        roomName : "testRoom"
      }),
    });
    const data = await response.json();
    return data.roomId; 
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
    return data; 
  }
};

export default ChatService;
