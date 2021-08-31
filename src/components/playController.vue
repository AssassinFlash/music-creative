<template>
  <div id="playController">
    <div class="playController">
      <div class="left" @click="showSong">
        <div class="song-pic">
          <img :src="songs.al.picUrl" alt="" v-if="isPic">
          <img src="../assets/img/swiper1.jpg" alt="" v-else>
        </div>
        <div class="song-desc">
          <div class="song-title" ref="songTitle">
            <span ref="s-title">{{ songs.name }}</span>
          </div>
          <!--          <marquee behavior="scroll" direction="left" class="song-title">{{ songs.name }}</marquee>-->
          <p class="tips">{{ isPic ? author : '横滑切换歌曲' }}</p>
        </div>
      </div>
      <div class="right">
        <svg
          class="icon"
          aria-hidden="true"
          @click="playSong"
          v-show="!$store.state.isPlaying">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          @click="stopSong"
          v-show="$store.state.isPlaying">
          <use xlink:href="#icon-zantingtingzhi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofangliebiao"></use>
        </svg>
      </div>
      <audio
        ref="audio"
        :src="`https://music.163.com/song/media/outer/url?id=${song_id}.mp3`"
        preload="auto"
      ></audio>
      <playMusic v-if="$store.state.isShow" :playDetail="songs"></playMusic>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getSongDetail, checkSong } from '@/api/goodMusicList'
import emitter from '@/utils/eventBus'
import playMusic from '@/components/playMusic'

export default {
  name: 'playController',
  components: {
    playMusic
  },
  data: function () {
    return {
      isPic: false,
      songs: {},
      artists: [],
      interId: null,
      timer: null
    }
  },
  computed: {
    ...mapState({
      songList: state => state.playlist,
      currentIndex: state => state.playCurrentIndex,
      song_id: state => state.song_id,
      currentTime: state => state.currentTime,
      lyricList: state => state.lyricList
    }),
    author: function () {
      let res = ''
      this.artists.forEach(x => {
        res += x.name + '、'
      })
      res = res.slice(0, res.length - 1)
      return res
    }
  },
  methods: {
    ...mapMutations(['setPlaylist', 'setPlayCurrentIndex', 'setCurrentTime', 'setSongId']),
    titleScroll: function () {
      clearInterval(this.timer)
      const target = this.$refs.songTitle
      const span = this.$refs['s-title']
      let initLeft = 0
      let initRight = target.offsetWidth / 2
      this.timer = setInterval(() => {
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
      }, 16)
    },
    loadCurrentSong: async function (ids) {
      const res = await getSongDetail(ids)
      this.songs = res.data.songs[0]
      this.artists = res.data.songs[0].ar
      this.isPic = true
      // console.log(this.lyricList)
      if (this.$store.state.isPlaying) {
        await this.playSong()
      }
      // console.log(this.artists)
    },
    playSong: async function () {
      if (this.isPic) {
        // this.isPlaying = true
        const res = await checkSong(this.song_id)
        const canSongPlay = res.data.success
        if (canSongPlay) {
          this.$store.commit('setIsPlaying', true)
          this.$refs.audio.play()
          this.$store.commit('setSongTime', this.$refs.audio.duration)
          this.updateTime()
        } else {
          console.log('该歌曲没有版权')
        }
      }
    },
    stopSong: function () {
      if (this.isPic) {
        // this.isPlaying = false
        this.$store.commit('setIsPlaying', false)
        this.$refs.audio.pause()
        clearInterval(this.interId)
      }
    },
    showSong: function () {
      this.$store.commit('setIsShow', true)
    },
    updateTime: function () {
      this.interId = setInterval(() => {
        // console.log(this.$refs.audio.currentTime)
        this.setCurrentTime(this.$refs.audio.currentTime)
      }, 1000)
    }
  },
  mounted () {
    emitter.on('updateController', () => {
      this.loadCurrentSong(this.song_id)
    })
    emitter.on('playSong', () => {
      this.playSong()
    })
    emitter.on('stopSong', () => {
      this.stopSong()
    })
    emitter.on('setAudioCurrentTime', (time) => {
      this.$refs.audio.currentTime = time
    })
  },
  updated () {
    this.titleScroll()
  }
}
</script>

<style lang="less" scoped>
#playController {
  // 解决fixed遮挡一部分元素的问题：外层套一个div，给上高度
  height: 1.1rem;

  .playController {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 7.5rem;
    height: 1.1rem;
    background: white;
    border-top: 1px solid #f5f5f5;
    padding: 0 .3rem 0 0.2rem;
    z-index: 2;

    .left, .right {
      display: flex;
      align-items: center;
    }

    .left {
      height: 100%;

      .song-pic {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: .74rem;
        height: .74rem;
        border-radius: .37rem;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .song-desc {
        width: 3.83rem;
        height: 100%;
        margin-left: 0.2rem;
        padding-top: .1rem;
        transition: all .2s ease;
        overflow: hidden;

        .song-title {
          white-space: nowrap;
          font-weight: 700;
          font-size: .3rem;
        }

        .tips {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: .2rem;
          color: #9e9e9e;
        }
      }
    }

    .right {
      .icon {
        width: .53rem;
        height: .53rem;

        &:first-of-type, &:nth-of-type(2) {
          margin-right: .42rem;
        }
      }
    }
  }
}
</style>
