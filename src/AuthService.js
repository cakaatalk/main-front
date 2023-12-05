import axios from 'axios';

const API_Auth_URL = 'http://localhost:8080/api/auth'; 

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

  // refreshAccessToken: async () => {
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   if (!refreshToken) {
  //     return Promise.reject('Refresh token not found');
  //   }

  //   try {
  //     const response = await axios.get(`${API_Auth_URL}/refresh`, {
  //       headers: {
  //         'Authorization': `Bearer ${refreshToken}`,
  //       },
  //     });
  //     return response.data.accessToken;
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // },

  // setupInterceptors: () => {
  //   axios.interceptors.response.use(
  //     (response) => response, 
  //     async (error) => {
  //       const originalRequest = error.config;
  //       if (error.response.status === 401 && !originalRequest._retry) {
  //         originalRequest._retry = true;
  //         try {
  //           const newAccessToken = await AuthService.refreshAccessToken();
  //           originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
  //           return axios(originalRequest);
  //         } catch (refreshError) {
  //           return Promise.reject(refreshError);
  //         }
  //       }
  //       return Promise.reject(error);
  //     }
  //   );
  // },
};


export default AuthService;