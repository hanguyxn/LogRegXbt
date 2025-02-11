import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://a72a-2405-4800-1f06-3200-ed0e-6920-e276-4042.ngrok-free.app/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;