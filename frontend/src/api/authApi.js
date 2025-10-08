import axios from './indexApi';

export const login = (credentials) =>
  axios.post('/auth/login', credentials);

export const register = (userData) => {
  return axios.post('/auth/register', userData);
};

export const getCurrentUser = () => axios.get('/auth/me');
