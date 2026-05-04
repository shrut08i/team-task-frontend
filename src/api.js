import axios from 'axios';

const API = axios.create({ baseURL: 'https://mongodb-production-5485.up.railway.app/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;