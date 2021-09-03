import axios from 'axios'
const request = axios.create({
  baseURL: 'https://musicbackend.jiangzhihao.com/'
})
export default request
