import axios from 'axios';

const getApiKeys = async () => {
  const token = localStorage.getItem('token');
  return axios.get('/api/v1/auth/list/apikeys', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const createApiKey = async (keyData) => {
  const token = localStorage.getItem('token');
  return axios.post('/api/v1/auth/register/app', keyData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const deleteApiKey = async (id) => {
  const token = localStorage.getItem('token');
  return axios.delete(`/api/v1/auth/app/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export default { getApiKeys, createApiKey, deleteApiKey };