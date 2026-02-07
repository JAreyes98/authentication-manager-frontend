import api from '../api/axiosConfig';

const getApiKeys = () => api.get('/api/v1/auth/list/apikeys');
const createApiKey = (keyData) => api.post('/api/v1/auth/register/app', keyData);
const deleteApiKey = (id) => api.delete(`/api/v1/auth/app/${id}`);
export default { getApiKeys, createApiKey, deleteApiKey };