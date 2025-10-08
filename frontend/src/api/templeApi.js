import axios from './indexApi';

export const getTemples = async () =>
  await axios.get('/temples');
export const getVerifiedTemples = () =>
  axios.get('/temples/verified');
export const getMyTemples = async () => {
  const token = await localStorage.getItem('token');
  return axios.get('/temples/my-temples', {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

export const getTempleById = async (id) =>
  await axios.get(`/temples/${id}`);

export const createTemple = async (templeData) => {
  return await axios.post('/temples', templeData);
};

export const updateTemple = async (id, updatedData) => {
  const token = await localStorage.getItem('token');
  return axios.put(`/temples/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

export const deleteTemple = async (id) => {
  const token = await localStorage.getItem('token');
  return axios.delete(`/temples/${id}`, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

export const verifyTemple = async (id) => {
  const token = await localStorage.getItem('token');
  return axios.put(
    `/temples/verify/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    }
  );
};

export const getNotConnectedTemples = async () => {
  const token = await localStorage.getItem('token');
  return axios.get(`/temples/not-connected`, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};

export const connectTempleWithUser = async (data) => {
  const token = await localStorage.getItem('token');
  return await axios.post('/temples/connect', data, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  });
};
