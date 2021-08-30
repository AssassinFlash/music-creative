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
            <marquee behavior="scroll" direction="left" class="title">{{ playDetail.name }}</marquee>
            <div class="author">{{ author }}</div>
          </div>
        </div>
        <div class="right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
        </div>
      </div>
      <div class="playContent">
        <img
          class="needle"
          :class="{needleActive:isPlaying}"
          src="../assets/img/needle-ip6.png"
          @click="isPlaying=!isPlaying">
        <img
          class="disc"
          src="../assets/img/disc-ip6.png">
        <img class="songCover" :src="playDetail.al.picUrl">
      </div>
      <div class="playLyric"></div>
      <div class="progress"></div>
      <div class="playFooter"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playMusic',
  props: ['playDetail'],
  data: function () {
    return {
      isPlaying: false
    }
  },
  mounted () {
    console.log(this.playDetail)
  },
  methods: {
    unShow: async function () {
      this.$store.commit('setIsShow', false)
    }
  },
  computed: {
    author: function () {
      let res = ''
      this.playDetail.ar.forEach(x => {
        res += x.name + '、'
      })
      res = res.slice(0, res.length - 1)
      return res
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
    background-color: #fff;
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
          height: 100%;

          .title {
            padding-top: .27rem;
            color: white;
            font-size: .35rem;
            font-weight: 700;
            line-height: .35rem;
          }

          .author {
            padding-top: .1rem;
            color: #ada8a5;
            font-size: .28rem;
            line-height: .28rem;
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
      position: absolute;
      width: 7.5rem;
      height: 7.5rem;
      left: 0;
      top: 1.5rem;

      .needle {
        position: absolute;
        left: calc(50% - .8rem);
        width: 2.3rem;
        height: auto;
        transform: rotate(-27deg);
        transition: all 1s;
        transform-origin: .3rem 0;
        z-index: 2;
      }

      .needleActive {
        transform: rotate(0deg);
        transform-origin: .3rem 0;
      }

      .disc {
        position: absolute;
        left: calc(50% - 3rem);
        top: 2rem;
        width: 6rem;
        height: auto;
      }

      .songCover {
        position: absolute;
        left: calc(50% - 1.861rem);
        top: 3.16rem;
        width: 3.72rem;
        height: 3.72rem;
        border-radius: 1.86rem;
      }
    }
  }
}
</style>
