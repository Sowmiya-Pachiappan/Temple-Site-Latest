import axios from './indexApi';

export const connectUserToTemple = (templeId) =>
  axios.post(`/user/connect-temple/:${templeId}`);

export const getUsers = () => axios.get('/user');
