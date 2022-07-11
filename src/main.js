import Vue from 'vue'
import App from './App.vue'

//ElementUI中全局引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入路由器
import router from './router'
// 引入vux
import store from './store'
//引入VueRouter
import VueRouter from 'vue-router'
// 引入样式
import './assets/less/index.less'
// axios
import http from 'axios'

Vue.config.productionTip = false

//使用ElementUI
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.$http = http

//push 
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})