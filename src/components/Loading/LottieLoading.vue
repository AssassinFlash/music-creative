<template>
  <div>
    <lottie
      :options="defaultOptions"
      speed="2"
      style="width: 7.5rem; height: 100vh;"
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
