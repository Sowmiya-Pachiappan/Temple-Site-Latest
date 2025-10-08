import axios from './indexApi';

export const getEvents = () => axios.get('/events');

export const getEventById = (id) =>
  axios.get(`/events/${id}`);

export const createEvent = async (eventData) => {
  const token = await localStorage.getItem('token');
  return axios.post('/events', eventData, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

export const updateEvent = async (id, updatedData) => {
  const token = await localStorage.getItem('token');
  return axios.put(`/events/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

export const deleteEvent = async (id) => {
  const token = await localStorage.getItem('token');
  return axios.delete(`/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

export const getEventsByTemple = (templeId) =>
  axios.get(`/events/temple/${templeId}`);
