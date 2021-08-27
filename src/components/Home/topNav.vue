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
  height: 1.2rem /* 60/50 */;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .2rem;

  .topLeft, .topCenter, .topRight {
    display: flex
  }

  .topLeft, .topRight {
    width: 1rem;
  }

  .topRight {
    .icon {
      width: 0.46rem  /* 23/50 */;
      height: 0.46rem  /* 23/50 */;
      margin-left: .5rem;
    }
  }

  .topCenter {
    flex: 1;
    justify-content: space-around;
    align-items: center;

    .navBtn {
      font-size: 0.42rem /* 21/50 */;
      color: #8b8b8b;
    }

    .active {
      font-size: 0.48rem  /* 24/50 */;
      font-weight: 700;
      color: black;
    }
  }
}
</style>
