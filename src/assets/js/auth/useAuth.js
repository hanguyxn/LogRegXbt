import { ref, onMounted } from 'vue'
import apiClient from '@/axios'
import router from '@/router'
import showMessage from '../message'

const isAuthenticated = ref(false)

export function useAuth() {
  const checkSession = async () => {
    try {
      const response = await apiClient.get('/auth/session')
      if (response.status == 200 && response.data.id){
        isAuthenticated.value = true
      }else if (response.status == 401 || response?.data?.message == "No active session"){
        showMessage('warning', response?.data?.message)
        isAuthenticated.value = false
        router.push('/login')
      }
      
    } catch (error) {
      console.error('Session check failed:', error)
      isAuthenticated.value = false
    }
  }

  const login = async (credentials) => {
    try {
      // await apiClient.post('/auth/login', credentials)
      await checkSession()
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const logout = async () => {
    try {
      const response = await apiClient.get('/auth/logout')
      if (response.status == 200){
        isAuthenticated.value = false
        router.push('/login')
        showMessage("success", response.data.message)
      }
      
    } catch (error) {
      showMessage("error", error)
    }
  }

  onMounted(() => {
    checkSession()
  })

  return {
    isAuthenticated,
    checkSession,
    login,
    logout,
  }
}
