import api from '../api/axiosConfig';

const getUsers = () => api.get('/api/v1/auth/list/users');
const createUser = (userData) => api.post('/api/v1/auth/register/user', userData);
const deleteUser = (id) => api.delete(`/api/v1/auth/user/${id}`);

export default { getUsers, createUser, deleteUser };