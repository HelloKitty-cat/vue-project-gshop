import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import MainHeader from './components/MainHeader/MainHeader'
import {Button} from 'mint-ui'

Vue.component('MainHeader',MainHeader);
Vue.component(Button.name,Button);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});

