import { createStore } from 'vuex'

export default createStore({
  state: {
    loading: false // 加载状态
  },
  mutations: {
    setLoading: function (state, status) {
      state.loading = status
    }
  },
  actions: {},
  modules: {}
})
