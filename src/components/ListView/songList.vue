<template>
  <div id="songList">
    <div class="songList">
      <div class="songList-top">
        <div class="left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <div class="songCount">
            <span class="s-title">播放全部</span>
            <span class="s-count">(共{{ playlist.trackCount }}首)</span>
          </div>
        </div>
        <div class="right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-hao"></use>
          </svg>
          <div class="collect">
            <span class="c-title">收藏</span>
            <span class="c-count">({{ collectCount }})</span>
          </div>
        </div>
      </div>
      <div class="list">
        <LottieLoading v-if="$store.state.loading"></LottieLoading>
        <div class="songItem"
             v-for="(song,index) in songList"
             :key="index" @click="getControllerFullSongs(song.id,index)">
          <div class="left">
            <p class="index">{{ index + 1 }}</p>
            <div class="content">
              <p class="song-title">{{ song.name }}</p>
              <p class="song-author">{{ author(song.ar) }} - {{ song.name }}</p>
            </div>
          </div>
          <div class="right">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-sandian1"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongDetail } from '@/api/goodMusicList'
import LottieLoading from '@/components/Loading/LottieLoading'
import { mapMutations } from 'vuex'
import emitter from '@/utils/eventBus'

export default {
  name: 'songList',
  components: {
    LottieLoading
  },
  props: ['playlist'],
  data () {
    return {
      songList: []
    }
  },
  methods: {
    ...mapMutations(['setPlaylist', 'setPlayCurrentIndex', 'setSongId']),
    getFullSongList: async function () {
      this.$store.commit('setLoading', true)
      let ids = ''
      this.playlist.trackIds.forEach(x => {
        ids += x.id + ','
      })
      ids = ids.slice(0, ids.length - 1)
      const res = await getSongDetail(ids)
      this.songList = res.data.songs
      this.$store.commit('setLoading', false)
    },
    author: function (val) {
      let res = ''
      val.forEach(x => {
        res += x.name + '、'
      })
      res = res.slice(0, res.length - 1)
      return res
    },
    getControllerFullSongs: function (songId, index) {
      this.setPlaylist(this.songList)
      this.setSongId(songId)
      this.setPlayCurrentIndex(index)
      this.$store.dispatch('reqLyric', songId)
      emitter.emit('updateController')
    }
  },
  computed: {
    collectCount: function () {
      let res = this.playlist.subscribedCount
      if (res >= 10000) {
        res = (res / 10000).toFixed(2) + '万'
      }
      return res
    }
  },
  mounted () {
    this.getFullSongList()
  }
}
</script>

<style lang="less" scoped>
#songList {
  .songList {
    width: 7.5rem;
    margin-top: .32rem;

    .songList-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      width: 100%;
      height: .875rem;
      border-top-left-radius: .35rem;
      border-top-right-radius: .35rem;
      background: white;
      padding: 0 .1rem 0 .27rem;

      .left, .right {
        display: flex;
        align-items: center;
      }

      .left {
        .icon {
          width: .41rem;
          height: .41rem;
          margin-right: .292rem;
        }

        .songCount {
          display: flex;
          align-items: center;

          .s-title {
            font-size: .29rem;
            margin-right: .1rem;
          }

          .s-count {
            font-size: .23rem;
            color: #999999;
          }
        }
      }

      .right {
        justify-content: center;
        width: 1.94rem;
        height: .77rem;
        border-radius: .38rem;
        background: #fe3a3c;

        .icon {
          width: .215rem;
          margin-right: .12rem;
        }

        .collect {
          display: flex;
          align-items: center;

          .c-title, .c-count {
            font-size: .22rem;
            color: white;
          }
        }
      }
    }

    .list {
      width: 100%;
      overflow: auto;
      background: white;

      .songItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.375rem;

        .left {
          flex: 1;
          display: flex;
          align-items: center;

          .index {
            width: .97rem;
            text-align: center;
          }

          .content {
            width: 4.5rem;
            display: flex;
            flex-direction: column;

            .song-title, .song-author {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .song-title {
              font-weight: 700;
              margin-bottom: .1rem;
            }

            .song-author {
              font-size: .27rem;
              color: #959595;
            }
          }
        }

        .right {
          .icon {
            width: .292rem;
            height: .292rem;
            margin-right: .42rem;

            &:first-of-type {
              margin-left: .2rem;
            }
          }
        }
      }
    }
  }
}
</style>
