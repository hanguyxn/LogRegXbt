import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:7423/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient
