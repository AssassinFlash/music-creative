<template>
  <div id="icon">
    <div class="iconList">
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tuijian"></use>
        </svg>
        <span>每日推荐</span>
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
    margin: 0.42rem /* 21/50 */ auto 0;
    padding: 0 0.2rem /* 10/50 */;

    .iconItem {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 1.26rem /* 63/50 */;
      height: 100%;
      cursor: pointer;

      .icon {
        width: 100%;
        height: 1.26rem
      }

      span {
        font-size: 0.3rem /* 15/50 */;
      }
    }
  }
}
</style>
