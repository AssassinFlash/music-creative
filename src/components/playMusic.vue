<template>
  <div id="playMusic">
    <div ref="playMusic" class="playMusic animate__animated animate__slideInUp" v-if="playDetail">
      <div class="bg" :style="{backgroundImage:`url(${playDetail.al.picUrl})`}"></div>
      <div class="playTop">
        <div class="left">
          <div class="back" @click="unShow">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-prev"></use>
            </svg>
          </div>
          <div class="desc">
            <div class="title" ref="title"><span ref="s-title">{{ playDetail.name }}</span></div>
            <div class="author">{{ author }}</div>
          </div>
        </div>
        <div class="right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
        </div>
      </div>
      <div
        class="playContent animate__animated animate__fadeInLeft"
        v-show="!isLyric"
        @click="isLyric=true">
        <img
          class="needle"
          :class="{needleActive:isPlaying}"
          src="../assets/img/needle-ip6.png">
        <img
          class="disc"
          src="../assets/img/disc-ip6.png">
        <img class="songCover" :src="playDetail.al.picUrl">
        <div style="clear: both"></div>
      </div>
      <div
        class="playLyric animate__animated animate__fadeInLeft"
        v-show="isLyric"
        ref="playLyric"
        @click="isLyric=false">
        <!--处于该句歌词的时间大于上一句歌词的时间，小于该句歌词的结束时间-->
        <p
          :class="{active:duration(lrc.preTime,lrc.curTime)}"
          v-for="(lrc,index) in lyricList"
          :key="index" :id="index">
          {{ lrc.lyric }}
        </p>
      </div>
      <div class="progress">
        <span class="cur_time">{{ handlesongTime(currentTime) }}</span>
        <div class="bar" ref="bar" @click="changeTime">
          <div class="fill" ref="fill"></div>
        </div>
        <span class="total_time">{{ handlesongTime(songTime) }}</span>
      </div>
      <div class="playFooter">
        <div class="setHeight">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xunhuanbofang"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="changeSong(-1)">
            <use xlink:href="#icon-shangyishoushangyige"></use>
          </svg>
          <svg
            v-show="!isPlaying"
            class="icon bofang"
            aria-hidden="true"
            @click="playSong">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <svg
            v-show="isPlaying"
            class="icon bofang"
            aria-hidden="true"
            @click="stopSong">
            <use xlink:href="#icon-zantingtingzhi-copy"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="changeSong(1)">
            <use xlink:href="#icon-xiayishou"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofangliebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/utils/eventBus'
import { mapState } from 'vuex'

export default {
  name: 'playMusic',
  props: ['playDetail'],
  data: function () {
    return {
      isLyric: false
    }
  },
  mounted () {
    this.titleScroll()
    // console.log(this.playDetail)
  },
  methods: {
    titleScroll: function () {
      const target = this.$refs.title
      const span = this.$refs['s-title']
      let initLeft = 0
      let initRight = target.offsetWidth / 2
      setInterval(() => {
        if (span.offsetWidth > target.offsetWidth) {
          if (initLeft < initRight) {
            initLeft++
            target.style = `transform:translateX(${initLeft}px)`
          }
          if (initLeft >= initRight) {
            initRight--
            target.style = `transform:translateX(${initRight}px)`
          }
          if (initRight < -(target.offsetWidth / 2)) {
            initRight = target.offsetWidth / 2
            initLeft = -(target.offsetWidth / 2)
          }
        }
      }, 20)
    },
    unShow: async function () {
      this.$store.commit('setIsShow', false)
    },
    playSong: function () {
      // this.$store.commit('setIsPlaying', true)
      emitter.emit('playSong')
    },
    stopSong: function () {
      // this.$store.commit('setIsPlaying', false)
      emitter.emit('stopSong')
    },
    duration: function (preTime, curTime) {
      return this.currentTime * 1000 >= preTime &&
        this.currentTime * 1000 <= curTime
    },
    changeSong: function (num) {
      let index = this.playCurrentIndex + num
      if (index < 0) {
        index = this.playlist.length - 1
      }
      if (index > this.playlist.length - 1) {
        index = 0
      }
      this.$store.commit('setPlayCurrentIndex', index)
      this.$store.commit('setSongId', this.playlist[this.playCurrentIndex].id)
      this.$store.dispatch('reqLyric', this.song_id)
      emitter.emit('updateController')
    },
    handlesongTime: function (time) {
      let minstr = ''
      let secstr = ''
      const min = parseInt((time / 60).toString().split('.')[0])
      const sec = parseInt((time % 60).toString().split('.')[0])
      if (min === 0) {
        minstr = '00'
      } else if (min < 10) {
        minstr = '0' + min
      } else {
        minstr = min
      }
      if (sec === 0 || sec === 60) {
        secstr = '00'
      } else if (sec < 10) {
        secstr = '0' + sec
      } else {
        secstr = sec
      }
      return minstr + ':' + secstr
    },
    handleProgressBar: function () {
      const fillBar = this.$refs.fill
      fillBar.style.width = (this.currentTime / this.songTime) * 100 + '%'
    },
    changeTime: function (event) {
      const target = this.$refs.bar
      const fillBar = this.$refs.fill
      const ratio = event.offsetX / target.offsetWidth
      emitter.emit('setAudioCurrentTime', this.songTime * ratio)
      fillBar.style.width = ratio * 100 + '%'
    }
  },
  computed: {
    ...mapState(['isPlaying', 'lyricList', 'currentTime', 'playCurrentIndex', 'playlist', 'song_id', 'songTime']),
    author: function () {
      let res = ''
      this.playDetail.ar.forEach(x => {
        res += x.name + '、'
      })
      res = res.slice(0, res.length - 1)
      return res
    }
  },
  watch: {
    // 监听播放时间，让div滚动到歌词显示的部分
    currentTime: function (newValue) {
      const pActive = document.querySelector('.playLyric .active')
      // 获取active的歌词偏移头部的高度
      // 然后让div滚动偏移的高度
      if (this.lyricList.length !== 1) {
        if (pActive) {
          this.$refs.playLyric.scrollTop = pActive.offsetTop - this.$refs.playLyric.offsetHeight / 2
        }
      }
      if (newValue === this.songTime) {
        // console.log('播放完毕')
        this.changeSong(1)
        // emitter.emit('stopSong')
      }
      this.handleProgressBar()
    }
  }
}
</script>

<style lang="less" scoped>
#playMusic {
  .playMusic {
    animation-duration: .3s;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #888888;
    width: 100vw;
    height: 100vh;

    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      background-size: 100% 100%;
      background-position: center;
      filter: blur(40px);
      z-index: -1;
    }

    .playTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 1.21rem;

      .left {
        display: flex;
        align-items: center;
        height: 100%;

        .back {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.09rem;
          height: 100%;
          cursor: pointer;

          .icon {
            width: .42rem;
            height: .35rem;
            fill: white;
          }
        }

        .desc {
          display: flex;
          flex-direction: column;
          width: 5.16rem;
          overflow: hidden;
          height: 100%;
          transition: all .2s ease;

          .title {
            padding-top: .27rem;
            white-space: nowrap;
            color: white;
            font-size: .35rem;
            font-weight: 700;
            line-height: .35rem;
          }

          .author {
            margin-top: .1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #ccc;
            font-size: .28rem;
            line-height: .33rem;
          }
        }
      }

      .right {
        padding-right: .27rem;

        .icon {
          width: .41rem;
          height: .41rem;
          fill: white;
        }
      }
    }

    .playContent {
      animation-duration: .3s;
      //position: relative;
      //position: absolute;
      width: 7.5rem;
      height: 7.5rem;
      //left: 0;
      //top: 1.5rem;
      display: flex;
      flex-direction: column;
      //justify-content: center;
      align-items: center;
      margin-top: .5rem;
      position: relative;

      &:after {
        content: '';
        visibility: hidden;
        display: block;
        clear: both;
      }

      .needle {
        //position: absolute;
        //left: calc(50% - .8rem);
        width: 2.3rem;
        height: auto;
        transform: rotate(-27deg);
        transition: all 1s;
        transform-origin: .3rem 0;
        z-index: 2;
      }

      .needleActive {
        transform: rotate(-3deg);
        transform-origin: .3rem 0;
      }

      .disc {
        position: absolute;
        left: calc(50% - 3rem);
        top: 1.7rem;
        width: 6rem;
        height: auto;
      }

      .songCover {
        position: absolute;
        left: calc(50% - 1.861rem);
        top: 2.84rem;
        width: 3.72rem;
        height: 3.72rem;
        border-radius: 1.86rem;
      }
    }

    .playLyric {
      animation-duration: .3s;
      width: 7.5rem;
      height: 8rem;
      margin-top: 1rem;
      padding: 0 .7rem;
      overflow: auto;
      scroll-behavior: smooth;

      p {
        text-align: center;
        padding: 0.1rem 0;
        width: 100%;
        word-break: break-word;
        color: white;
        line-height: 2;
        transition: all 1s;
      }

      .active {
        color: #F21F5C;
        text-shadow: 1px 1px 1px #000000;
      }
    }

    .progress {
      position: absolute;
      left: 0;
      bottom: 1.4rem;
      width: 7.5rem;
      height: .83rem;
      padding: 0 .5rem;
      display: flex;
      align-items: center;

      .cur_time, .total_time {
        width: .7rem;
        font-size: .28rem;
        color: #ccc;
      }

      .cur_time {
        margin-right: .15rem;
      }

      .total_time {
        margin-left: .15rem;
      }

      .bar {
        flex: 1;
        height: .1rem;
        background: rgba(243, 243, 243, .4);
        position: relative;

        .fill {
          position: absolute;
          left: 0;
          top: 0;
          height: .1rem;
          background: white;
        }
      }
    }

    .playFooter {
      height: 1.38rem;

      .setHeight {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 7.5rem;
        height: 1.38rem;
        padding: 0 1.1rem .1rem;

        .icon {
          width: .4rem;
          height: .4rem;
          fill: white;
        }

        .bofang {
          width: .97rem;
          height: .97rem;
        }
      }
    }
  }
}
</style>
