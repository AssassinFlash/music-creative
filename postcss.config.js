// postcss的配置文件
// postCSS是基于node.js运行的一个处理CSS的工具
// 所以它的配置文件也是运行在Node.js中
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 50,
      propList: ['*']
    }
    // 添加浏览器厂商兼容声明，用来兼容不同浏览器
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // }
  }
}
