import axios from 'axios'
const request = axios.create({
  baseURL: 'https://netease-cloud-music-api-assassinflash.vercel.app/'
})
export default request
