<template>
  <div id="MorePlayList animate__animated animate__slideInUp">
    <div class="MorePlayList" ref="playlistDom">
      <van-tabs
        v-model:active="active"
        :before-change="beforeChange"
        animated
        sticky
      >
        <van-tab
          v-for="(playlist,index)
          in hotCategory.tags"
          :title="playlist.name"
          :key="index">
          <div class="playlist">
            <LottieLoading v-if="$store.state.loading"></LottieLoading>
            <div
              class="playlist-item"
              v-for="(music,index) in tagLists"
              @click="$router.push({name:'ListView',query:{id:music.id}})"
              :key="index">
              <img :src="music.coverImgUrl" alt="">
              <p>{{ music.name }}</p>
              <div class="playCount">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-icon-"></use>
                </svg>
                <span> {{ Math.round(music.playCount / 10000) }} 万</span>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Hammer from 'hammerjs'
import { hotMusic, tagPlaylists } from '@/api/goodMusicList'
import LottieLoading from '@/components/Loading/LottieLoading'
import { ref, onBeforeMount, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'GengduoGedan',
  components: {
    LottieLoading
  },
  setup () {
    const router = useRouter()
    const playlistDom = ref()
    // 手势操作
    onMounted(() => {
      const hammer = new Hammer(playlistDom.value)
      hammer.on('swipe', (e) => {
        if (e.deltaX <= -100) {
          router.go(-1)
        }
      })
    })

    const store = useStore()
    const active = ref(0)

    // 获取热门歌单标签
    const hotCategory = ref({})
    const loadHotPlaylist = async function () {
      store.commit('setLoading', true)
      const res = await hotMusic()
      hotCategory.value = res.data
      store.commit('setLoading', false)
    }
    // 获取单个标签里面的歌单
    const tagLists = ref([])
    const beforeChange = async index => {
      await loadTagList(hotCategory.value.tags[index].name)
      return Promise.resolve(true)
    }
    const loadTagList = async function (tag) {
      store.commit('setLoading', true)
      const res = await tagPlaylists(tag)
      tagLists.value = res.data.playlists
      store.commit('setLoading', false)
    }

    onBeforeMount(async () => {
      await loadHotPlaylist()
      await loadTagList(hotCategory.value.tags[0].name)
    })
    return {
      active,
      playlistDom,
      hotCategory,
      tagLists,
      beforeChange
    }
  }
}
</script>

<style lang="less" scoped>
#MorePlayList {
  animation-duration: .3s;
  width: 7.5rem;
}

.MorePlayList {
  width: 7.5rem;
  margin: 0 auto;
}

.playlist {
  width: 7.5rem;
  margin-top: .2rem;
  padding-left: .15rem;
  display: flex;
  flex-wrap: wrap;

  .playlist-item {
    position: relative;
    width: 2.11rem;
    margin: .1rem .15rem;
    height: 3rem;

    &:nth-of-type(3n) {
      margin-right: 0;
    }

    img {
      width: 100%;
      border-radius: .1rem;
      height: 2.11rem;
    }

    p {
      width: 100%;
      height: .7rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: .25rem;
    }

    .playCount {
      position: absolute;
      right: 0.1rem;
      top: 0;
      display: flex;
      align-items: center;

      span {
        font-size: .25rem;
        color: white;
      }

      .icon {
        width: .35rem;
        height: .35rem;
      }
    }
  }
}
</style>
