import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueLazyload from 'vue-lazyload'
import MainHeader from './components/MainHeader/MainHeader'
import {Button} from 'mint-ui'
import Split from './components/Split/Split.vue'
import loading from './common/images/timg.gif'
// 注册为全局组件标签
Vue.component('Split', Split)
Vue.component('MainHeader',MainHeader);
Vue.component(Button.name,Button);
import './mock/mockServer.js'
import './filters'

Vue.use(VueLazyload, {
  preLoad: 0.8,
  loading
})

/* eslint-disable */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});

