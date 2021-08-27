import request from '@/utils/request'
// 获取banner轮播图数据 接口要求type类型数据，1为android，0为PC
export const getBanner = (type = 1) => {
  return request({
    method: 'GET',
    url: '/banner',
    params: {
      type
    }
  })
}
