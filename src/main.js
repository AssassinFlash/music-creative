import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 在入口文件中引入移动端适配函数
import '../public/js/rem.js'
// 引入全局样式
import '@/styles/index.less'
createApp(App).use(store).use(router).mount('#app')
