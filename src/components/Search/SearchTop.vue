<template>
  <div id="searchTop">
    <div class="searchTop animate__animated animate__slideInUp">
      <div class="topNav">
        <div class="back" @click="$router.go(-1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-prev"></use>
          </svg>
        </div>
        <div class="right">
          <input
            type="text"
            :placeholder="placeholder"
            v-model="searchKeywords"
            @keydown.enter="saveKeywords"/>
        </div>
      </div>
      <div class="history">
        <div class="historyLeft">历史</div>
        <div class="historyRight">
          <div
            class="keywordItem"
            v-for="(keyword,index) in keywordList"
            :key="index"
            @click="autoSearch(keyword)"
          >{{ keyword }}
          </div>
        </div>
      </div>
      <div>
        <LottieLoading v-if="$store.state.loading"></LottieLoading>
        <div class="songList animate__animated animate__slideInUp" v-if="isShow">
          <div class="songList-top">
            <div class="left">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              <div class="songCount">
                <span class="s-title">播放全部</span>
                <span class="s-count">(共{{ songCount }}首)</span>
              </div>
            </div>
          </div>
          <div class="list">
            <div class="songItem"
                 v-for="(song,index) in playlist"
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
import { searchMusic } from '@/api/goodMusicList'
import emitter from '@/utils/eventBus'
import LottieLoading from '@/components/Loading/LottieLoading'
import { mapMutations } from 'vuex'

export default {
  name: 'SearchTop',
  components: {
    LottieLoading
  },
  data () {
    return {
      placeholder: '输入要搜寻的关键词',
      searchKeywords: '',
      keywordList: [],
      isShow: false, // 显示歌单列表
      playlist: [{}], // 搜寻到的歌曲列表
      songCount: 0
    }
  },
  beforeMount () {
    if (this.$route.params.name) {
      this.autoSearch(this.$route.params.name)
    }
    // keywordList是数组，localStorage里是字符串，所以要转换
    this.keywordList = window.localStorage.getItem('keywordList')
      ? JSON.parse(window.localStorage.getItem('keywordList')) : []
  },
  methods: {
    ...mapMutations(['setPlaylist', 'setSongId', 'setPlayCurrentIndex']),
    async saveKeywords () {
      // localStorage只能存储字符串
      if (this.keywordList.length >= 1) {
        const ifExist = this.keywordList.includes(this.searchKeywords)
        if (!ifExist) {
          this.keywordList.push(this.searchKeywords)
          window.localStorage.setItem('keywordList', JSON.stringify(this.keywordList))
        }
      } else {
        this.keywordList.push(this.searchKeywords)
        window.localStorage.setItem('keywordList', JSON.stringify(this.keywordList))
      }
      await this.loadSearchSong(this.searchKeywords)
    },
    loadSearchSong: async function (keyword) {
      this.$store.commit('setLoading', true)
      const res = await searchMusic(keyword)
      this.playlist = res.data.result.songs
      this.songCount = res.data.result.songCount
      this.isShow = true
      this.$store.commit('setLoading', false)
      // console.log(res.data)
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
      this.setPlaylist(this.playlist)
      this.setSongId(songId)
      this.setPlayCurrentIndex(index)
      this.$store.dispatch('reqLyric', songId)
      emitter.emit('updateController')
    },
    autoSearch: function (keyword) {
      this.searchKeywords = keyword
      this.loadSearchSong(keyword)
    },
    goMv: function (id) {
      this.$router.push({
        name: 'MvView',
        params: { id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#searchTop {
  .searchTop {
    width: 7.5rem;
    animation-duration: .3s;

    .topNav {
      width: 100%;
      height: .97rem;
      padding: .15rem .46rem .15rem .35rem;
      display: flex;
      align-items: center;

      .back {
        width: .5rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: .35rem;

        .icon {
          width: .45rem;
          height: .45rem;
        }
      }

      .right {
        flex: 1;
        height: 100%;

        input {
          display: block;
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          border-bottom: 3px solid #8b8b8b;
          text-indent: .1rem;
          font-size: .31rem;
          line-height: 1.5;
          letter-spacing: 2px;
          color: #8b8b8b;
        }
      }
    }

    .history {
      width: 100%;
      min-height: .8rem;
      padding: .1rem .46rem .1rem .35rem;
      display: flex;

      .historyLeft {
        width: .8rem;
        height: .6rem;
        margin-top: .4rem;
        display: flex;
        align-items: center;
        font-size: .3rem;
        font-weight: 700;
      }

      .historyRight {
        width: 6rem;
        max-height: 2.3rem;
        overflow: auto;
        margin-left: .3rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .keywordItem {
          padding: .17rem .25rem;
          margin-right: .3rem;
          margin-top: .3rem;
          background: #f3f3f3;
          border-radius: .3rem;
        }
      }
    }

    .songList {
      width: 7.5rem;
      margin-top: .32rem;
      animation-duration: .3s;

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
}
</style>
