// 移动端适配
function remSize () {
  // 获取设备宽度
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth
  // 设计稿一般要求是750
  if (deviceWidth >= 750) {
    deviceWidth = 750
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320
  }
  // 适应设备宽度，改变根字体大小，这条式子相当于1rem = (窗体宽度/7.5)px
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
  // 然后显示一般用的窗体宽度是375px，故此时1rem=50px
}
// 调用函数实现监听当窗口宽度发生变化时能改变根字体
remSize()
window.onresize = function () {
  remSize()
}
