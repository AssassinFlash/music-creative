<template>
  <div id="listView animate__animated animate__slideInUp">
    <LottieLoading v-if="$store.state.loading"></LottieLoading>
    <div>
      <listViewTop :playlist="state.playlist" :avatarUrl="avatarUrl" :nickname="nickname"></listViewTop>
      <!--      <songList :playlist="state.playlist" :trackIds="trackIds"></songList>-->
      <div id="songList">
        <div class="songList">
          <div class="songList-top">
            <div class="left">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              <div class="songCount">
                <span class="s-title">播放全部</span>
                <span class="s-count">(共{{ state.playlist.trackCount }}首)</span>
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
                <div class="mv" v-show="song.mv!==0" @click="goMv(song.mv)">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang1"></use>
                  </svg>
                </div>
                <div class="songMore">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-sandian1"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPlayListDetail, getSongDetail } from '@/api/goodMusicList'
import listViewTop from '@/components/ListView/listViewTop'
// import songList from '@/components/ListView/songList'
import LottieLoading from '@/components/Loading/LottieLoading'
import { mapMutations } from 'vuex'
import emitter from '@/utils/eventBus'

export default {
  name: 'ListView',
  components: {
    listViewTop,
    // songList,
    LottieLoading
  },
  data () {
    return {
      state: {
        list: [],
        playlist: {}
      },
      avatarUrl: '',
      nickname: '',
      trackIds: [],
      songList: []
    }
  },
  methods: {
    ...mapMutations(['setPlaylist', 'setPlayCurrentIndex', 'setSongId']),
    // 获取歌单详情
    loadPlayList: async function () {
      // console.log(this.$route.query.id)
      this.$store.commit('setLoading', true)
      const res = await getPlayListDetail(this.$route.query.id)
      // console.log(res.data)
      this.state.playlist = res.data.playlist
      this.trackIds = res.data.playlist.trackIds
      this.avatarUrl = res.data.playlist.creator.avatarUrl
      this.nickname = res.data.playlist.creator.nickname
      this.$store.commit('setLoading', false)
    },
    getFullSongList: async function () {
      this.$store.commit('setLoading', true)
      let ids = ''
      this.trackIds.forEach(x => {
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
    },
    goMv: function (mvId) {
      this.$router.push({
        name: 'MvView',
        params: { id: mvId }
      })
    }
  },
  computed: {
    collectCount: function () {
      let res = this.state.playlist.subscribedCount
      if (res >= 10000) {
        res = (res / 10000).toFixed(2) + '万'
      }
      return res
    }
  },
  async created () {
    await this.loadPlayList()
    await this.getFullSongList()
  }
  // mounted () {
  //   this.getFullSongList()
  // }
}
</script>
<style lang="less" scoped>
#listView {
  animation-duration: .3s;

}

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
        display: flex;
        justify-content: center;
        align-items: center;
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
          display: flex;
          align-items: center;
          height: 100%;

          .mv {
            width: 40px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .icon {
              width: .4rem;
              height: .4rem;
            }
          }

          .songMore {
            width: 40px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: .1rem;

            .icon {
              width: .4rem;
              height: .4rem;
            }
          }
        }
      }
    }
  }
}
</style>
