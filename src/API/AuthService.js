import env from '../Components/Common/dotenv';

const API_Auth_URL = env.REACT_APP_API_BASE_URL + "/auth";

const AuthService = {
  signUp: async (userData) => {
    const response = await fetch(`${API_Auth_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    return data.accessToken; 
  },
  login: async (userData) => {
    console.log(API_Auth_URL);
    const response = await fetch(`${API_Auth_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    return data.accessToken; 
  },
  logout: async () => {
    const response = await fetch(`${API_Auth_URL}/logout`, {
      method: 'POST'
    });
    return response.json(); 
  },
  refreshAccessToken: async () => {
    const response = await fetch(`${API_Auth_URL}/refresh`, {
      method: 'GET'
    });
    const data = await response.json();
    return data.accessToken; 
  },
};

export default AuthService;