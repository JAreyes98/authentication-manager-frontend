import axios from 'axios';

const getUsers = async () => {
  const token = localStorage.getItem('token');
  return axios.get('/api/v1/auth/list/users', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const createUser = async (userData) => {
  const token = localStorage.getItem('token');
  return axios.post('/api/v1/auth/register/user', userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const deleteUser = async (id) => {
  const token = localStorage.getItem('token');
  return axios.delete(`/api/v1/auth/user/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export default { getUsers, createUser, deleteUser };