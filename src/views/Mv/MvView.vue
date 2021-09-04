<template>
  <div id="MvView">
      <div class="MvView" ref="myView">
        <div class="playMv">
          <div class="block" v-if="showBlock">
            <svg class="icon" aria-hidden="true" @click.stop="playMv">
              <use xlink:href="#icon-bofang"></use>
            </svg>
          </div>
          <video
            ref="video"
            :src="mvUrl.url"
            :poster="mvDetail.cover"
            :controls="showController"
          ></video>
          <!--        <div class="bofangController" v-show="showController">-->
          <!--          <div class="bofang" @click.stop="playMv">-->
          <!--            <svg class="icon" aria-hidden="true" v-show="showBlock">-->
          <!--              <use xlink:href="#icon-icon-"></use>-->
          <!--            </svg>-->
          <!--            <svg class="icon" aria-hidden="true" v-show="!showBlock">-->
          <!--              <use xlink:href="#icon-zantingtingzhi1"></use>-->
          <!--            </svg>-->
          <!--          </div>-->
          <!--          <div class="progress">-->
          <!--            <div class="bar" ref="bar" @click="changeTime">-->
          <!--              <div class="fillBar" ref="fillBar"></div>-->
          <!--            </div>-->
          <!--            <div class="time">-->
          <!--              <span class="cur_time">{{ curTime }}</span>-->
          <!--              <span class="line">/</span>-->
          <!--              <span class="total_time">{{ totalTime }}</span>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--        </div>-->
        </div>
        <div class="singer">
          <LottieLoading v-if="$store.state.loading"></LottieLoading>
          <div class="top">
            <div class="singer-avatar">
              <img :src="singer.cover" alt="">
            </div>
            <div class="singer-desc">
              <div class="singer-name">{{ singer.name }}</div>
              <div class="singer-songs">{{ singer.musicSize }}首歌曲，{{ singer.mvSize }}个MV</div>
            </div>
          </div>
          <div class="center">
            <div class="mv-name">{{ singer.name }} - {{ mvDetail.name }}</div>
          </div>
          <div class="bottom">
            <span class="playCount">{{ playCount }}次播放</span>
            <span class="publishTime">{{ mvDetail.publishTime }}</span>
          </div>
        </div>
        <div class="moreList">
          <div class="top">更多 {{ singer.name }} 的MV</div>
          <div class="list">
            <div class="mv-item"
                 v-for="(mv,index) in singerMvs"
                 @click="goToMv(mv.id)"
                 :key="index">
              <div class="thumbnail">
                <img :src="mv.imgurl16v9" alt="">
              </div>
              <div class="mv-item-desc">
                <div class="mv-item-name">{{ mv.artistName }} - {{ mv.name }}</div>
                <div class="mv-item-time">
                  <span>{{ getPlayCount(mv.playCount) }}次播放</span>
                  <span>{{ mv.publishTime }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getMvDetail, getMvUrl, getSingerDetails, getSingerMvs } from '@/api/goodMusicList'
import Hammer from 'hammerjs'
import LottieLoading from '@/components/Loading/LottieLoading'

export default {
  name: 'MvView',
  components: {
    LottieLoading
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const myView = ref()

    // 播放控件是否显示
    const showController = ref(false)
    // 播放器遮罩
    const showBlock = ref(true)

    // 获取mv详情
    const playCount = ref('')
    const mvDetail = ref({})
    const mvUrl = ref({})
    const loadMvDetail = async function () {
      const res = await getMvDetail(route.params.id)
      mvDetail.value = res.data.data
      playCount.value = getPlayCount(mvDetail.value.playCount)
    }
    const loadMvUrl = async function () {
      const res = await getMvUrl(route.params.id)
      mvUrl.value = res.data.data
    }
    const getPlayCount = function (target) {
      if (target < 10000) {
        return target.toString()
      }
      if (target >= 10000 && target < 100000000) {
        return ((target / 10000).toFixed(2)).toString() + '万'
      }
      if (target >= 100000000) {
        return ((target / 100000000).toFixed(2)).toString() + '亿'
      }
    }

    // 获取歌手详情
    const singer = ref({})
    const loadSingerDetails = async function () {
      const res = await getSingerDetails(mvDetail.value.artistId)
      singer.value = res.data.data.artist
      // console.log(singer.value)
    }

    // 获取歌手mv
    const singerMvs = ref([])
    const loadSingerMvs = async function () {
      const res = await getSingerMvs(singer.value.id)
      singerMvs.value = res.data.mvs
      // console.log(singerMvs.value)
    }

    const video = ref()
    // 播放mv
    const playMv = function () {
      if (showBlock.value === true) {
        showBlock.value = false
        // totalTime.value = handleMvTime(video.value.duration)
        // store.commit('setmvtotalTime', video.value.duration)
        video.value.play()
        // updateTime()
      } else {
        showBlock.value = true
        showController.value = false
        // clearInterval(interId.value)
        video.value.pause()
      }
    }

    // 获得mvid更新页面
    const goToMv = async function (id) {
      await router.replace({
        name: 'MvView',
        params: { id }
      })
      store.commit('setLoading', true)
      await loadMvDetail()
      await loadMvUrl()
      await loadSingerDetails()
      await loadSingerMvs()
      store.commit('setLoading', false)
      window.location.reload()
    }

    // 更新播放时间
    // const interId = ref(null)
    // const curTime = ref('00:00')
    // const totalTime = ref('')
    // const updateTime = function () {
    //   interId.value = setInterval(() => {
    //     store.commit('setmvcurrentTime', video.value.currentTime)
    //     curTime.value = handleMvTime(store.state.mvcurrentTime)
    //     handleProgressBar()
    //   }, 1000)
    // }
    // const handleMvTime = function (time) {
    //   let minstr = ''
    //   let secstr = ''
    //   const min = parseInt((time / 60).toString().split('.')[0])
    //   const sec = parseInt((time % 60).toString().split('.')[0])
    //   if (min === 0) {
    //     minstr = '00'
    //   } else if (min < 10) {
    //     minstr = '0' + min
    //   } else {
    //     minstr = min
    //   }
    //   if (sec === 0 || sec === 60) {
    //     secstr = '00'
    //   } else if (sec < 10) {
    //     secstr = '0' + sec
    //   } else {
    //     secstr = sec
    //   }
    //   return minstr + ':' + secstr
    // }
    // const bar = ref()
    // const fillBar = ref()
    // const handleProgressBar = function () {
    //   fillBar.value.style.width = (store.state.mvcurrentTime / store.state.mvTotalTime) * 100 + '%'
    // }
    // const changeTime = function (e) {
    //   // console.log(e.offsetX)
    //   // console.log(bar.value.offsetWidth)
    //   video.value.currentTime = (e.offsetX / bar.value.offsetWidth) * store.state.mvTotalTime
    //   handleProgressBar()
    // }

    onBeforeMount(async () => {
      store.commit('setLoading', true)
      await loadMvDetail()
      await loadMvUrl()
      await loadSingerDetails()
      await loadSingerMvs()
      store.commit('setLoading', false)
    })

    onMounted(() => {
      // 手势操作
      const hammer = new Hammer(video.value)
      const hammer1 = new Hammer(myView.value)
      hammer.on('tap', () => {
        showController.value = !showController.value
      })
      hammer.on('doubletap', () => {
        playMv()
      })
      hammer1.on('swipe', e => {
        if (e.deltaX <= -100) {
          router.go(-1)
        }
      })
    })
    return {
      myView,
      showController,
      showBlock,
      video,
      playMv,
      mvDetail,
      playCount,
      getPlayCount,
      // mvDesc,
      mvUrl,
      singer,
      singerMvs,
      goToMv
      // curTime,
      // totalTime,
      // bar,
      // fillBar,
      // changeTime
    }
  }
}
</script>

<style lang="less" scoped>
#MvView {
  width: 7.5rem;

  .MvView {
    width: 7.5rem;

    .playMv {
      width: 100%;
      height: 4.3rem;
      position: relative;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, .4);

      video {
        width: 100%;
        height: 4.3rem;
      }

      .block {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 4.3rem;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          width: 1.5rem;
          height: 1.5rem;
          fill: white;
        }
      }

      .bofangController {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: .8rem;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        padding: 0 .1rem;

        .bofang {
          display: flex;
          align-items: center;
          width: .7rem;
          height: .8rem;

          .icon {
            width: .6rem;
            height: .6rem;
          }
        }

        .progress {
          display: flex;
          align-items: center;
          width: 300px;
          height: .8rem;

          .bar {
            width: 220px;
            height: .13rem;
            background: #ccc;
            position: relative;

            .fillBar {
              position: absolute;
              left: 0;
              top: 0;
              height: .13rem;
              background: #fff;
              transition: all .2s ease;
            }
          }

          .time {
            width: 90px;
            height: .8rem;
            display: flex;
            align-items: center;

            .cur_time, .total_time {
              width: 45px;
              font-size: 0.2rem;
              text-align: center;
              color: white;
            }

            .line {
              color: white;
            }
          }
        }
      }
    }

    .singer {
      width: 7.5rem;
      min-height: 3.1rem;
      padding-top: .1rem;

      .top {
        display: flex;
        align-items: center;
        width: 7.5rem;
        height: 1.25rem;
        padding: 0 .4rem 0 .3rem;

        .singer-avatar {
          width: .8rem;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: .3rem;

          img {
            width: 100%;
            height: .8rem;
            border-radius: .4rem;
          }
        }

        .singer-name {
          font-size: .35rem;
          color: #fb67a3;
          margin-bottom: .1rem;
        }

        .singer-songs {
          font-size: .28rem;
          color: #898989;
        }
      }

      .center {
        width: 7.5rem;
        margin-top: .28rem;
        padding: 0 .4rem 0 .3rem;

        .mv-name {
          font-size: .4rem;
        }
      }

      .bottom {
        width: 7.5rem;
        height: .7rem;
        padding: 0 .3rem;
        display: flex;
        align-items: center;

        .playCount, .publishTime {
          font-size: .292rem;
          color: #898989;
        }

        .playCount {
          margin-right: .3rem;
        }
      }
    }

    .moreList {
      width: 7.5rem;
      margin-top: .1rem;

      .top {
        width: 100%;
        height: .7rem;
        padding: 0 .3rem;
        border-top-left-radius: .35rem;
        border-top-right-radius: .35rem;
        border: 1px solid #ccc;
        line-height: .7rem;
      }

      .mv-item {
        width: 100%;
        height: 2rem;
        padding: 0 .3rem;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        background: rgb(250, 250, 250);

        .thumbnail {
          width: 2.7rem;
          height: 100%;
          margin-right: .2rem;
          display: flex;
          align-items: center;

          img {
            width: 2.7rem;
            height: 1.5rem;
            border-radius: 10px;
          }
        }

        .mv-item-desc {
          width: 205px;
          height: 100%;
          padding: .3rem 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .mv-item-name {
            width: 100%;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: .3rem;
          }

          .mv-item-time {
            span {
              font-size: .28rem;

              &:first-of-type {
                margin-right: .3rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
