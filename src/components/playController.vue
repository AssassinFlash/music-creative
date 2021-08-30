<template>
  <div id="playController">
    <div class="playController">
      <div class="left" @click="showSong">
        <div class="song-pic">
          <img :src="songs.al.picUrl" alt="" v-if="isPic">
          <img src="../assets/img/swiper1.jpg" alt="" v-else>
        </div>
        <div class="song-desc">
          <marquee behavior="scroll" direction="left" class="song-title">{{ songs.name }}</marquee>
          <p class="tips">{{ isPic ? author : '横滑切换歌曲' }}</p>
        </div>
      </div>
      <div class="right">
        <svg
          class="icon"
          aria-hidden="true"
          @click="playSong"
          v-show="!isPlaying">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          @click="stopSong"
          v-show="isPlaying">
          <use xlink:href="#icon-zantingtingzhi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofangliebiao"></use>
        </svg>
      </div>
      <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${currentIndex}.mp3`"></audio>
      <playMusic v-if="$store.state.isShow" :playDetail="songs"></playMusic>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getSongDetail } from '@/api/goodMusicList'
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
      isPlaying: false,
      songs: {},
      artists: []
    }
  },
  computed: {
    ...mapState({
      songList: state => state.playlist,
      currentIndex: state => state.playCurrentIndex
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
    ...mapMutations(['setPlaylist', 'setPlayCurrentIndex']),
    loadCurrentSong: async function (ids) {
      const res = await getSongDetail(ids)
      this.songs = res.data.songs[0]
      this.artists = res.data.songs[0].ar
      this.isPic = true
      if (this.isPlaying) {
        this.playSong()
      }
      // console.log(this.artists)
    },
    playSong: function () {
      if (this.isPic) {
        this.isPlaying = true
        this.$refs.audio.play()
      }
    },
    stopSong: function () {
      if (this.isPic) {
        this.isPlaying = false
        this.$refs.audio.pause()
      }
    },
    showSong: function () {
      this.$store.commit('setIsShow', true)
    }
  },
  async mounted () {
    // console.log(this.$refs.audio)
    await emitter.on('updateController', async () => {
      await this.loadCurrentSong(this.currentIndex)
    })
  }
}
</script>

<style lang="less" scoped>
#playController {
  // 解决fixed遮挡一部分元素的问题：外层套一个div，给上高度
  height: .94rem;

  .playController {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 7.5rem;
    height: .94rem;
    background: white;
    border-top: 1px solid #f5f5f5;
    padding: 0 .3rem 0 .2rem;
    z-index: 2;

    .left, .right {
      display: flex;
      align-items: center;
    }

    .left {
      .song-pic {
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
        padding-left: 0.2rem;

        .song-title {
          font-weight: 700;
        }

        .tips {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
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
