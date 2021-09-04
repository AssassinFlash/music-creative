import axios from 'axios'

const request = axios.create({
  // baseURL: 'http://localhost:3000/'
  baseURL: 'https://musicbackend.jiangzhihao.com/'
})
export default request
