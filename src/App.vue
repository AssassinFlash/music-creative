<template>
  <router-view/>
  <playController></playController>
</template>
<script>
import playController from '@/components/playController'

export default {
  name: 'App',
  components: {
    playController
  }
}
</script>
<style lang="less">

</style>
