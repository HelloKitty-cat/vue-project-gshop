import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import MainHeader from './components/MainHeader/MainHeader'

Vue.component('MainHeader',MainHeader);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});

