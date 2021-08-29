<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <div class="topCenter">
      <span class="navBtn">我的</span>
      <span class="navBtn active">发现</span>
      <span class="navBtn">云村</span>
      <span class="navBtn">视频</span>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topNav'
}
</script>

<style lang="less" scoped>
.topNav {
  width: 7.5rem;
  height: .83rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .2rem;

  .topLeft, .topCenter, .topRight {
    display: flex
  }

  .topLeft, .topRight {
    width: .45rem;
  }

  .topCenter {
    flex: 1;
    margin: 0 .6rem;
    justify-content: space-around;
    align-items: center;

    .navBtn {
      font-size: 0.29rem /* 21/50 */;
      color: #8b8b8b;
    }

    .active {
      font-size: 0.33rem  /* 24/50 */;
      font-weight: 700;
      color: black;
    }
  }
}
</style>
