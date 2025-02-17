import axios from 'axios'

// axios.defaults.withCredentials = true

const apiClient = axios.create({
  baseURL: 'https://0ea6-2405-4800-1f06-3200-9901-8c6d-f889-94e6.ngrok-free.app/api/v1',
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
