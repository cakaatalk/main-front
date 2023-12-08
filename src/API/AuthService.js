import axios from "axios";

const API_Auth_URL = "http://localhost:8080/api/auth";

const AuthService = {
  signUp: async (userData) => {
    return axios.post(`${API_Auth_URL}/signup`, userData);
  },
  login: async (userData) => {
    return axios.post(`${API_Auth_URL}/login`, userData);
  },
  logout: async () => {
    return axios.post(`${API_Auth_URL}/logout`);
  },
  refreshAccessToken: async () => {
    return axios.get(`${API_Auth_URL}/refresh`);
  },
};

export default AuthService;
