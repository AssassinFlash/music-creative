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

// 获取歌曲歌词
export const getSongLyric = id => {
  return request({
    method: 'GET',
    url: '/lyric',
    params: {
      id
    }
  })
}

// 查看歌曲是否能正常播放
export const checkSong = id => {
  return request({
    method: 'GET',
    url: '/check/music',
    params: { id }
  })
}

// 搜索歌曲
export const searchMusic = keywords => {
  return request({
    method: 'GET',
    url: '/cloudsearch',
    params: {
      keywords
    }
  })
}

// 热门歌单分类
export const hotMusic = () => {
  return request({
    method: 'GET',
    url: '/playlist/hot'
  })
}

// 根据标签获得歌单数组
export const tagPlaylists = cat => {
  return request({
    method: 'GET',
    url: '/top/playlist/highquality',
    params: {
      cat
    }
  })
}

// 热门歌手
export const getHotSingerList = (limit = 10) => {
  return request({
    method: 'GET',
    url: '/top/artists',
    params: {
      limit: limit
    }
  })
}
