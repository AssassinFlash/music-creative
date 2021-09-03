<template>
  <div id="banner">
    <div class="swiper-container">
      <van-swipe :autoplay="3000" loop>
        <van-swipe-item v-for="(image,index) in imgs" :key="index">
          <img :src="image.pic" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--    <div class="swiper-container">-->
    <!--      <div class="swiper-wrapper">-->
    <!--        <div class="swiper-slide" v-for="(image,index) in imgs" :key="index">-->
    <!--          <img :src="image.pic" alt="">-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      &lt;!&ndash; 如果需要分页器 &ndash;&gt;-->
    <!--      <div class="swiper-pagination"></div>-->

    <!--      &lt;!&ndash; 如果需要导航按钮 &ndash;&gt;-->
    <!--      &lt;!&ndash;    <div class="swiper-button-prev"></div>&ndash;&gt;-->
    <!--      &lt;!&ndash;    <div class="swiper-button-next"></div>&ndash;&gt;-->

    <!--    </div>-->
  </div>
</template>
<script>
// 导入轮播图组件
// import Swiper from 'swiper'
// import 'swiper/css/swiper.css'
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
    // const mySwiper = new Swiper('#banner .swiper-container', {
    //   direction: 'horizontal', // 垂直切换选项
    //   loop: true, // 循环模式选项
    //
    //   // 如果需要分页器
    //   pagination: {
    //     el: '.swiper-pagination'
    //   }
    //
    //   // 如果需要前进后退按钮
    //   // navigation: {
    //   //   nextEl: '.swiper-button-next',
    //   //   prevEl: '.swiper-button-prev'
    //   // }
    // })
  }
}
</script>

<style lang="less">
#banner {
  width: 7.5rem;

  .swiper-container {
    width: 7.1rem;
    height: 2.7rem;
    border-radius: .3rem;
    overflow: hidden;
    margin: 0.31rem auto 0;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
