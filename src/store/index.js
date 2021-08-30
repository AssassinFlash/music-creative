import { createStore } from 'vuex'

export default createStore({
  state: {
    loading: false, // 加载状态
    isShow: false, // 播放歌曲详情
    playlist: [], // 播放列表
    playCurrentIndex: 0 // 当前播放到第几首歌
  },
  mutations: {
    setLoading: function (state, status) {
      state.loading = status
    },
    setPlaylist: function (state, value) {
      state.playlist = value
    },
    setPlayCurrentIndex: function (state, value) {
      state.playCurrentIndex = value
    },
    setIsShow: function (state, value) {
      state.isShow = value
    }
  },
  actions: {},
  modules: {}
})
