<template>
  <div class="home animate__animated animate__fadeInRight">
    <topNav></topNav>
    <swiperCom></swiperCom>
    <iconList></iconList>
    <musicList></musicList>
    <hotSingerList></hotSingerList>
  </div>
</template>

<script>
import topNav from '@/components/Home/topNav'
import swiperCom from '@/components/Home/swiperCom'
import iconList from '@/components/Home/iconList'
import musicList from '@/components/Home/musicList'
import hotSingerList from '@/components/Home/hotSingerList'
export default {
  name: 'Home',
  components: {
    topNav,
    swiperCom,
    iconList,
    musicList,
    hotSingerList
  },
  data () {
    return {}
  },
  computed: {},
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.home{
  animation-duration: .3s;
}
</style>
