<template>
  <div class="home">
    <topNav></topNav>
    <swiperCom></swiperCom>
  </div>
</template>

<script>
import topNav from '@/components/Home/topNav'
import swiperCom from '@/components/Home/swiperCom'

export default {
  name: 'Home',
  components: {
    topNav,
    swiperCom
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

</style>
