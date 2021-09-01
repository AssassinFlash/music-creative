<template>
  <div class="home animate__animated animate__fadeInRight">
    <topNav></topNav>
    <swiperCom></swiperCom>
    <iconList></iconList>
    <musicList></musicList>
  </div>
</template>

<script>
import topNav from '@/components/Home/topNav'
import swiperCom from '@/components/Home/swiperCom'
import iconList from '@/components/Home/iconList'
import musicList from '@/components/Home/musicList'
export default {
  name: 'Home',
  components: {
    topNav,
    swiperCom,
    iconList,
    musicList
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
