import axios from "axios"

const getAuthHeader = () => {
  return {
  }
}

axios.defaults.withCredentials = true
export const httpClient = () => axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000',
  headers: getAuthHeader(),
  withCredentials: true
})