import { JWT_ACCESS_TOKEN_KEY, JWT_REFRESH_TOKEN_KEY } from 'app/constants';
import { EventDispatcher } from 'libs/event-dispatcher';

import axios from 'axios';

class AuthService {
  constructor() {
    this.setDefaultHeaders();
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          EventDispatcher.dispatchUnauthorized();
        }
        return Promise.reject(error);
      }
    );
  }

  async login(email, password) {
    const response = await axios.post(`/api/login`, { email, password });
    this.setSession(response.data.accessToken, response.data.refreshToken);
    return response.data;
  }

  async register(userData) {
    const response = await axios.post(`/api/register`, userData);
    this.setSession(response.data.accessToken, response.data.refreshToken);
    return response.data;
  }

  logout() {
    this.setSession(null, null);
  }

  isSessionValid() {
    const {accessToken, refreshToken} = this.getTokenFromStorage();
    return accessToken && refreshToken;
  }

  getTokenFromStorage() {
    const accessToken = localStorage.getItem(JWT_ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(JWT_REFRESH_TOKEN_KEY);

    return {accessToken, refreshToken};
  }

  setDefaultHeaders() {
    const {accessToken, refreshToken} = this.getTokenFromStorage();

    if (accessToken && refreshToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  setSession(accessToken, refreshToken) {
    if (accessToken && refreshToken) {
      localStorage.setItem(JWT_ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(JWT_REFRESH_TOKEN_KEY, refreshToken);
    } else {
      localStorage.removeItem(JWT_ACCESS_TOKEN_KEY);
      localStorage.removeItem(JWT_REFRESH_TOKEN_KEY);
    }

    this.setDefaultHeaders();
  }
}

export const authService = new AuthService();
