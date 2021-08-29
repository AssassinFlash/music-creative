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
    }
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
      height: .74rem;

      .left, .right {
        display: flex;
        align-items: center;
        height: 100%;
      }

      .left {
        .back {
          width: .4rem;
          height: .4rem;
          margin-right: .4rem;
          fill: white;
        }

        .title {
          font-size: .33rem;
          color: white;
        }
      }

      .right {
        .search {
          width: .5rem;
          height: .5rem;
          margin-right: .3rem;
          fill: white;
        }

        .more {
          width: .4rem;
          height: .4rem;
          fill: white;
        }
      }
    }

    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 7.1rem;
      height: 2.5rem;
      margin: .2rem auto 0;

      .contentLeft {
        position: relative;
        width: 2.44rem;
        height: 2.44rem;
        margin-right: .4rem;
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
          font-size: .2rem;
          color: white;
        }
      }

      .contentRight {
        flex: 1;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        h3 {
          margin-bottom: .2rem;
          font-size: .32rem;
          color: white;
        }

        .author {
          width: 100%;
          display: flex;
          align-items: center;

          .avatar {
            width: .53rem;
            height: .53rem;
            border-radius: .265rem;
            margin-right: .2rem;
          }

          .author-name {
            width: fit-content;
            margin-right: .1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: .24rem;
            line-height: .4rem;
            color: #cdcdcd;
          }

          .icon {
            width: .24rem;
            height: .24rem;
            fill: #cdcdcd;
          }
        }

        .description {
          display: flex;
          align-items: center;
          width: 100%;
          height: .6rem;
          margin-top: .2rem;

          span {
            width: 3rem;
            //height: 100%;
            //overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: .23rem;
            color: #b5acad;
          }

          .icon {
            width: .21rem;
            height: .21rem;
            margin: 0 .1rem;
            vertical-align: middle;
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
      height: .72rem;
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
          font-size: .21rem;
          color: #c8c8d0;
        }
      }
    }
  }
}
</style>
