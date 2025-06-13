import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

export const useLogOutIfExpiredToken = () => {
  const navigate = useNavigate()

  const handleLogOutIfExpiredToken = (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('EpiManagerToken')
      navigate('/')
    }
  }

  return { handleLogOutIfExpiredToken }
}