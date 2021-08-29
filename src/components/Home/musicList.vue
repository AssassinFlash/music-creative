<template>
  <div id="musicList">
    <div class="musicList">
      <div class="musicList-top">
        <div class="title">发现好歌单</div>
        <div class="more">查看更多</div>
      </div>
      <div id="mList" class="mList">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <router-link
              :to="{ name:'ListView', query:{ id: music.id } }"
              class="swiper-slide"
              v-for="(music,index) in musicList"
              :key="index">
              <img :src="music.picUrl" alt="">
              <p>{{ music.name }}</p>
              <div class="playCount">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-icon-"></use>
                </svg>
                <span>{{ Math.round(music.playCount / 10000) }} 万</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图组件
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import { getMusicList } from '@/api/goodMusicList'

export default {
  name: 'musicList',
  data () {
    return {
      musicList: null
    }
  },
  methods: {
    // 获取发现歌单列表
    loadMusicList: async function () {
      const res = await getMusicList()
      // console.log(res.data)
      this.musicList = res.data.result
    }
  },
  mounted () {
    // eslint-disable-next-line no-unused-vars
    const mySwiper = new Swiper('#musicList .swiper-container', {
      loop: true,
      slidesPerView: 'auto',
      freeMode: true
    })
  },
  created () {
    this.loadMusicList()
  }
}
</script>

<style lang="less" scoped>
#musicList {
  width: 7.5rem;

  .musicList {
    width: 7.1rem;
    margin: 0.54rem auto 0 /* 39/50 */;
    padding: 0 0.1rem;

    .musicList-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: .5rem;

      .title {
        font-size: 0.4rem /* 20/50 */;
        font-weight: 700;
      }

      .more {
        height: 100%;
        padding: 0 0.24rem;
        border: 0.06rem solid #e8e8e8 /* 3/50 */;
        border-radius: 0.28rem;
        line-height: 0.38rem;
        font-size: .22rem;
        cursor: pointer;
      }
    }

    .mList {
      width: 7.1rem;
      margin: 0 auto;

      .swiper-container {
        width: 100%;
        margin-top: 0.3rem;

        .swiper-slide {
          position: relative;
          width: 2.11rem;
          margin: 0 0.14rem 0;
          cursor: pointer;
          text-decoration: none;

          &:first-of-type {
            margin: 0 0.14rem 0 0;
          }

          img {
            width: 100%;
            height: 2.11rem;
            margin-bottom: 0.1rem;
            border-radius: .12rem;
          }

          p {
            width: 100%;
            height: .7rem;
            padding: 0 0.1rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: .2rem;
            line-height: 1.5;
            color: black
          }

          .playCount {
            position: absolute;
            right: .1rem;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            .icon {
              width: 0.28rem /* 26/50 */;
              height: 0.28rem /* 26/50 */;
            }

            span {
              font-size: 0.28rem /* 26/50 */;
              color: white;
            }
          }
        }
      }
    }
  }
}

</style>
