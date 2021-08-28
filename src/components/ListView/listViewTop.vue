<template>
  <div id="listViewTop">
    <div class="listViewTop">
      <img :src="playlist.coverImgUrl" alt="" class="bg">
      <div class="listViewTopNav">
        <div class="left">
          <svg class="icon back" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-prev"></use>
          </svg>
          <span class="title">歌单</span>
        </div>
        <div class="right">
          <svg class="icon search" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
          <svg class="icon more" aria-hidden="true">
            <use xlink:href="#icon-sandian"></use>
          </svg>
        </div>
      </div>
      <div class="content">
        <div class="contentLeft">
          <img :src="playlist.coverImgUrl" alt="" class="playlist-cover">
          <div class="playCount">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon-"></use>
            </svg>
            <span>{{ Math.round(playlist.playCount / 10000) }}万</span>
          </div>
        </div>
        <div class="contentRight">
          <h3>{{ playlist.name }}</h3>
          <div class="author">
            <img :src="playlist.creator.avatarUrl" alt="" class="avatar">
            <span class="author-name">{{ playlist.creator.nickname }}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-right-arrow"></use>
            </svg>
          </div>
          <div class="description">
            <span>{{ playlist.description }}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-right-arrow"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="iconList">
        <div class="iconItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tubiaozhizuomoban-"></use>
          </svg>
          <span>{{ playlist.commentCount }}</span>
        </div>
        <div class="iconItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
          <span>{{ playlist.shareCount }}</span>
        </div>
        <div class="iconItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai"></use>
          </svg>
          <span>下载</span>
        </div>
        <div class="iconItem">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xuanze1"></use>
          </svg>
          <span>多选</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listViewTop',
  props: ['playlist'],
  data: function () {
    return {
      playList: null
    }
  },
  beforeMount () {
    this.playList = this.$props.playlist
  }
}
</script>

<style lang="less" scoped>
#listViewTop {
  width: 7.5rem;

  .listViewTop {
    width: 7.1rem;
    margin: 0 auto;

    .bg {
      position: fixed;
      left: 0;
      top: 0;
      width: 7.5rem;
      height: 7.4rem;
      z-index: -1;
      // 设置模糊度
      filter: blur(40px);
    }

    .listViewTopNav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 1.07rem;

      .left, .right {
        display: flex;
        align-items: center;
        height: 100%;
      }

      .left {
        .back {
          width: .58rem;
          height: .5rem;
          margin-right: .5rem;
          fill: white;
        }

        .title {
          font-size: .47rem;
          color: white;
        }
      }

      .right {
        .search {
          width: .77rem;
          height: 80%;
          margin-right: .4rem;
          fill: white;
        }

        .more {
          width: .58rem;
          height: .5rem;
          fill: white;
        }
      }
    }

    .content {
      display: flex;
      justify-content: space-between;
      width: 7.1rem;
      height: 3.5rem;
      margin: 0 auto;

      .contentLeft {
        position: relative;
        width: 3.5rem;
        height: 3.5rem;
        margin-right: .57rem;
        border-radius: .1rem;
        overflow: hidden;

        .playlist-cover {
          width: 100%;
          height: 100%;
        }

        .playCount {
          position: absolute;
          right: .15rem;
          top: 0;
          display: flex;
          align-items: center;
          color: white;
        }
      }

      .contentRight {
        flex: 1;
        height: 3.5rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        h3 {
          padding: .11rem 0 .3rem 0;
          font-size: .46rem;
          color: white;
        }

        .author {
          width: 100%;
          display: flex;
          align-items: center;

          .avatar {
            width: .76rem;
            height: .76rem;
            border-radius: .38rem;
            margin-right: .2rem;
          }

          .author-name {
            width: 1.5rem;
            height: .4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: .35rem;
            line-height: .4rem;
            color: #cdcdcd;
          }

          .icon {
            width: .35rem;
            height: .35rem;
            fill: #cdcdcd;
          }
        }

        .description {
          display: flex;
          align-items: center;
          width: 100%;
          height: .8rem;
          margin-top: .25rem;

          span {
            flex: 1;
            height: 100%;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: .3rem;
            color: #b5acad;
          }

          .icon {
            width: .3rem;
            height: .3rem;
            margin: 0 .1rem;
            fill: #b5acad;
          }
        }
      }
    }

    .iconList {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 6rem;
      height: 1.04rem;
      margin: .66rem auto 0;

      .iconItem {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .icon {
          margin-bottom: .1rem;
          fill: white;
        }

        span {
          font-size: .3rem;
          color: #c8c8d0;
        }
      }
    }
  }
}
</style>
