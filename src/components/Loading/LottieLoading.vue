<template>
  <div>
    <lottie
      :options="defaultOptions"
      speed="2"
      style="position:absolute;left:0;top:0;bottom:0;right:0;z-index:999999;background:rgba(255,255,255,.7);"
      loop
      autoplay>
    </lottie>
  </div>
</template>

<script>
import lottie from 'vue-lottie'
import * as animationData from '@/assets/img/9811-loading.json'

export default {
  name: 'LottieLoading',
  components: {
    lottie
  },
  data: function () {
    return {
      defaultOptions: { animationData: animationData.default }
    }
  }
}
</script>

<style scoped>

</style>
