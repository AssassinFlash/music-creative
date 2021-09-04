import { createStore } from 'vuex'
import { getSongLyric } from '@/api/goodMusicList'
import { phoneLogin, userDetail } from '@/api/user'

export default createStore({
  state: {
    user: {
      isLogin: false,
      account: {},
      userdetail: {}
    }, // 用户信息，判断用户是否登录
    loading: false, // 加载状态
    isShow: false, // 播放歌曲详情
    isPlaying: false, // 正在播放
    playlist: [], // 播放列表
    song_id: 0, // 歌曲ID
    playCurrentIndex: 0, // 当前播放到第几首歌
    lyricList: [], // 歌词
    currentTime: 0, // 歌词播放时间
    songTime: 0, // 歌曲总时间
    mvcurrentTime: 0, // mv播放时间
    mvTotalTime: 0 // mv总时间
  },
  mutations: {
    setLoading: function (state, status) {
      state.loading = status
    },
    setSongId: function (state, value) {
      state.song_id = value
    },
    setPlaylist: function (state, value) {
      state.playlist = value
    },
    setPlayCurrentIndex: function (state, value) {
      state.playCurrentIndex = value
    },
    setIsShow: function (state, value) {
      state.isShow = value
    },
    setIsPlaying: function (state, value) {
      state.isPlaying = value
    },
    setLyric: function (state, value) {
      state.lyricList = value
    },
    setCurrentTime: function (state, value) {
      state.currentTime = value
    },
    setSongTime: function (state, value) {
      state.songTime = value
    },
    setmvcurrentTime: function (state, value) {
      state.mvcurrentTime = value
    },
    setmvtotalTime: function (state, value) {
      state.mvTotalTime = value
    },
    setUserLogin: function (state, value) {
      state.user.isLogin = value
    },
    setUserAccount: function (state, value) {
      state.user.account = value
      console.log(state.user.account)
    },
    setUserDetail: function (state, value) {
      state.user.userdetail = value
    }
  },
  actions: {
    reqLyric: async function (content, songId) {
      const res = await getSongLyric(songId)
      let lyricArr = []
      if (res.data.lrc) {
        lyricArr = res.data.lrc.lyric.split(/\n/igs).map((x, i, arr) => {
          const reg = /^\[(.*?)\](.*?)$/igs
          const res = reg.exec(x)
          let lyric, curTime
          if (res) {
            const min = parseInt(res[1].slice(0, 2))
            const sec = parseInt(res[1].slice(3, 5))
            const millSec = parseInt(res[1].slice(6, 8))
            lyric = res[2]
            curTime = (millSec + sec * 1000 + min * 60 * 1000)
          }
          return {
            lyric,
            curTime
          }
        })
        // 要获取歌词的上一句歌词所对应的时间
        // 这样子该句歌词与上一句歌词的时间就可以做比较
        lyricArr.forEach((x, i, arr) => {
          if (i === 0) {
            // 判断歌词是不是第一句歌词
            x.preTime = 0
          } else {
            x.preTime = arr[i - 1].curTime
          }
        })
      } else {
        lyricArr.push({
          lyric: '这首歌是纯音乐，暂无歌词，请欣赏',
          curTime: 0
        })
      }
      // console.log(lyricArr)
      content.commit('setLyric', lyricArr)
    },
    login: async function (content, userParams) {
      // console.log(userParams)
      const res = await phoneLogin(userParams.phone, userParams.password)
      if (res.data.code === 200) {
        content.commit('setUserLogin', true)
        content.commit('setUserAccount', res.data.account)
        const res1 = await userDetail(res.data.account.id)
        content.commit('setUserDetail', res1.data)
      }
      return res.data
    }
  },
  modules: {}
})
