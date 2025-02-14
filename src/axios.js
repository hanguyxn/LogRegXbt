import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://077c-210-245-51-62.ngrok-free.app/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;