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
    console.log(response);
    const data = await response.json();
    if (data.error) {
      throw data.error
    }
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
  sendEmail: async (emailValue) => {
    const response = await fetch(`${API_Auth_URL}/mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
      }),
    });
    return response;
  },
  mailVerify: async (email, verifyNum) => {
    const response = await fetch(`${API_Auth_URL}/mail/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        authCode: verifyNum,
      }),
    });
    return response;
  },
  mailPassword: async (emailValue, passwordValue) => {
    const response = await fetch(`${API_Auth_URL}/mail/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue
      }),
    });
    return response;
  },
  mailUpdatePassword: async (emailValue, passwordValue) => {
    const response = await fetch(`${API_Auth_URL}/mail/updatepw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue
      }),
    });
    return response;
  }
};

export default AuthService;