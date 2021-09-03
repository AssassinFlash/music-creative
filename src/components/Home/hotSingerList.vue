<template>
  <div id="HotSingerList">
    <div class="HotSingerList">
      <div class="hotSingerList-top">
        <div class="title">热门歌手</div>
        <div class="more">查看更多</div>
      </div>
      <div id="singerList" class="singerList">
        <div class="swiper-container">
          <van-swipe :autoplay="3000" :loop="false" :width="120" :show-indicators="false">
            <van-swipe-item v-for="(singer,index) in hotSingerList.artists" :key="index">
              <div class="singerRouter" @click="$router.push({name:'SearchView',params:{name:singer.name}})">
                <img :src="singer.picUrl" alt="">
                <p>{{ singer.name }}</p>
                <div class="playCount">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon-"></use>
                  </svg>
                  <span> {{ singer.musicSize }} 首</span>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
// import {useStore} from 'vuex'
import { getHotSingerList } from '@/api/goodMusicList'

export default {
  name: 'hotSingerList',
  setup () {
    // const store = useStore()
    // 获取热门歌手
    const hotSingerList = ref([])
    const loadHotSingerList = async function () {
      const res = await getHotSingerList()
      hotSingerList.value = res.data
      console.log(hotSingerList.value)
    }
    onBeforeMount(async () => {
      await loadHotSingerList()
    })
    return {
      hotSingerList
    }
  }
}
</script>

<style lang="less" scoped>
#HotSingerList {
  width: 7.5rem;

  .HotSingerList {
    width: 7.1rem;
    margin: .54rem auto 0;
    padding: 0 0.1rem;

    .hotSingerList-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: .4rem;
        font-weight: 700;
      }

      .more {
        height: 100%;
        padding: 0 0.24rem;
        border: 0.06rem solid #e8e8e8 /* 3/50 */;
        border-radius: 0.28rem;
        line-height: 0.38rem;
        font-size: 0.22rem;
        cursor: pointer;
      }
    }

    .singerList {
      width: 100%;
      margin: 0 auto;

      .swiper-container {
        width: 100%;
        margin-top: .3rem;

        .singerRouter {
          position: relative;
          display: inline-block;
          width: 2.11rem;
          margin: 0 .14rem 0;
          cursor: pointer;

          &:first-of-type {
            margin-left: 0;
          }

          img {
            width: 100%;
            height: 110px;
            border-radius: 10px;
            margin-bottom: .1rem;
          }

          p {
            height: .7rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: .3rem;
            text-align: center;
            color: #888888;
          }

          .playCount {
            position: absolute;
            right: 5px;
            top: 0;
            display: flex;
            align-items: center;
            color: white;

            span {
              font-size: .3rem;
            }

            .icon {
              width: .35rem;
              height: .35rem;
            }
          }
        }
      }
    }
  }
}
</style>
