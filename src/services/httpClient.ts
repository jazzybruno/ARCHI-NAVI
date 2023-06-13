import axios from "axios"

const getAuthHeader = () => {
  return {
  }
}

axios.defaults.withCredentials = true
export const httpClient = () => axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  headers: getAuthHeader(),
  withCredentials: true
})