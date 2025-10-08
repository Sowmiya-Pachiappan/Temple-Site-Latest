import axios from './indexApi';

export const getHomePageContent = async () =>
  axios.get('/homepage');

export const updateHomePageContent = async (payload) => {
  const token = await localStorage.getItem('token');
  return axios.put('/homepage/update', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};
