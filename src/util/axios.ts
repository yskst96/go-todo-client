import axios from 'axios'

const myAxios = axios.create({ baseURL: process.env.VUE_APP_API_ENDPOINT })

export default myAxios
