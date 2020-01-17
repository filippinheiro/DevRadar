import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
   baseURL: 'https://dev-radar-omni.herokuapp.com/'
})

export default api