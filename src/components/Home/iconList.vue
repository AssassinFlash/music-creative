<template>
  <div id="icon">
    <div class="iconList">
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tuijian"></use>
        </svg>
        <span>推荐</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-faxian_sirenFM"></use>
        </svg>
        <span>私人FM</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gedan"></use>
        </svg>
        <span>歌单</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-paihangbang1"></use>
        </svg>
        <span>排行榜</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'iconList'
}
</script>

<style lang="less" scoped>
#icon {
  width: 7.5rem;

  .iconList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 7.1rem;
    margin: 0.4rem auto 0;
    padding: 0 0.2rem /* 10/50 */;

    .iconItem {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 1rem /* 43/50 */;
      cursor: pointer;

      .icon {
        width: .7rem;
        height: .7rem;
        margin-bottom: .1rem;
      }

      span {
        font-size: 0.21rem  /* 10.5/50 */
      }
    }
  }
}
</style>
