import axios from 'axios';

const API_URL = 'https://keebsforspeed-backend.onrender.com/api/users';

export const loginUser = (data) => axios.post(`${API_URL}/login`, data);
export const registerUser = (data) => axios.post(`${API_URL}/register`, data);
export const saveStats = (data, tok) => axios.post(`${API_URL}/stats`, data, { headers: { Authorization: `Bearer ${tok}` } });
export const fetchStats = (tok) => axios.get(`${API_URL}/stats`, { headers: { Authorization: `Bearer ${tok}` } });
