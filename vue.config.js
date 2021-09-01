// 打包时需要先配置这个文件
module.exports = {
  // 这步为的就是把public目录下的index.html里面<BASE_URL>给替换掉，变成相对路径
  publicPath: './',
  // 这步是为了把public目录下的index.html里面htmlWebpackPlugin.options.title替换掉
  pages: {
    index: {
      entry: 'src/main.js', // 设置入口文件
      title: 'jzh音乐播放器'
    }
  }
}
