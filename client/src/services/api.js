import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // your backend URL
});

export const loginUser = (userData) => API.post('/login', userData);
export const registerUser = (userData) => API.post('/register', userData);
