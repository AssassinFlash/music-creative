import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 在入口文件中引入移动端适配函数
import '../public/js/rem.js'
// 引入全局样式
import '@/styles/index.less'
// 引入动画插件
import animated from 'animate.css'
import Vant from 'vant'
import 'vant/lib/index.css'
createApp(App).use(store).use(router).use(animated).use(Vant).mount('#app')
