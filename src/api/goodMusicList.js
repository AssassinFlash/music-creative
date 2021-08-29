import request from '@/utils/request'
// 获得发现好歌单，接口要求参数：limit取出数量，默认为10
export const getMusicList = (limit = 10) => {
  return request({
    method: 'GET',
    url: '/personalized',
    params: {
      limit: limit
    }
  })
}

// 获取歌单的详情，接口要求参数：歌单id
export const getPlayListDetail = id => {
  return request({
    method: 'GET',
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

// 获取歌曲详情
export const getSongDetail = ids => {
  return request({
    method: 'GET',
    url: '/song/detail',
    params: {
      ids
    }
  })
}
