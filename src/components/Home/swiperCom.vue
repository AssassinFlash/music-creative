<template>
  <div id="banner">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(image,index) in imgs" :key="index">
          <img :src="image.pic" alt="">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <!--    <div class="swiper-button-prev"></div>-->
      <!--    <div class="swiper-button-next"></div>-->

    </div>
  </div>
</template>
<script>
// 导入轮播图组件
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import { getBanner } from '@/api/banner'

export default {
  name: 'swiperCom',
  data: function () {
    return {
      imgs: [
        { pic: require('@/assets/img/swiper1.jpg') }
      ]
    }
  },
  methods: {
    loadBanner: async function () {
      // 调用接口获得轮播图
      const res = await getBanner()
      this.imgs = res.data.banners
      // console.log(this.imgs)
    }
  },
  async mounted () {
    await this.loadBanner()
    // eslint-disable-next-line no-unused-vars
    const mySwiper = new Swiper('#banner .swiper-container', {
      direction: 'horizontal', // 垂直切换选项
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination'
      }

      // 如果需要前进后退按钮
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev'
      // }
    })
  }
}
</script>

<style lang="less">
#banner {
  width: 7.5rem;

  .swiper-container {
    width: 7.1rem;
    height: 3.76rem /* 188/50 */;
    border-radius: .3rem;
    overflow: hidden;
    margin-top: 0.44rem /* 22/50 */;

    .swiper-slide {

      img {
        width: 100%;
        height: 100%;
      }

    }
  }

  .swiper-pagination-bullet-active {
    background-color: orangered;
  }
}

</style>
