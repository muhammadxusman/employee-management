import axios from 'axios';

// The backend URL can be changed with VITE_API_URL (see .env.example)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export default api;
