import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './router/permission' //路由规则
import 'animate.css'
// import './element' //UI组件按需引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
