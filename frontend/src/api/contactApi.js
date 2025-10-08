import axios from './indexApi';

export const sendContactMessage = async (contactData) => {
  const token = await localStorage.getItem('token');
  return axios.post('/contact', contactData, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};
