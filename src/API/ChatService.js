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
      body : {
        users
      }
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
