import axios from 'axios'

const api = axios.create({
   baseURL: 'https://dev-radar-omni.herokuapp.com/'
})

export default api