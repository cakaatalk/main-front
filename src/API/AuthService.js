const API_Auth_URL = "http://localhost:8080/api/auth";

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
    if (data.error) {
      throw data.error
    }
    return data.accessToken;
  },
  login: async (userData) => {
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