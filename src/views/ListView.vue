<template>
  <div id="listView">
    <LottieLoading v-if="$store.state.loading"></LottieLoading>
    <div class="listView animate__animated animate__fadeInLeft">
      <listViewTop :playlist="state.playlist"></listViewTop>
      <songList :playlist="state.playlist"></songList>
    </div>
  </div>
</template>
<script>
import { getPlayListDetail } from '@/api/goodMusicList'
import listViewTop from '@/components/ListView/listViewTop'
import songList from '@/components/ListView/songList'
import LottieLoading from '@/components/Loading/LottieLoading'

export default {
  name: 'ListView',
  components: {
    listViewTop,
    songList,
    LottieLoading
  },
  data () {
    return {
      state: {
        list: [],
        playlist: {}
      }
    }
  },
  methods: {
    // 获取歌单详情
    loadPlayList: async function () {
      // console.log(this.$route.query.id)
      this.$store.commit('setLoading', true)
      const res = await getPlayListDetail(this.$route.query.id)
      // console.log(res.data)
      this.state.playlist = res.data.playlist
      this.$store.commit('setLoading', false)
    }
  },
  async created () {
    await this.loadPlayList()
  }
}
</script>
<style lang="less" scoped>
.listView {
  animation-duration: .3s;
}
</style>
