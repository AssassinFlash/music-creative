// 用户登录接口
import request from '@/utils/request'

// 手机登录
export const phoneLogin = (phone, password) => {
  return request({
    method: 'GET',
    url: '/login/cellphone',
    params: {
      phone,
      password
    }
  })
}

// 获取用户详情
export const userDetail = uid => {
  return request({
    method: 'GET',
    url: '/user/detail',
    params: {
      uid
    }
  })
}
