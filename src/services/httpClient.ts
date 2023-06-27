import axios, { AxiosError } from 'axios'

const getAuthHeader = () => {
  return {}
}

axios.defaults.withCredentials = true
export const httpClient = () =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
    headers: {
      ...getAuthHeader(),
    },
    withCredentials: true,
  })

export async function fetcher<T>(key: string, init?: RequestInit) {
  return httpClient()
    .get(key)
    .then((res) => res.data as Promise<T | null>)
}
