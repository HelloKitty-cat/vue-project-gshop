import Vue from 'vue'
import VueRouter from 'vue-router'

// import Msite from '../pages/Msite/Msite'
// import Search from '../pages/Search/Search'
// import Order from '../pages/Order/Order'
// import Profile from '../pages/Profile/Profile'

const Msite = () => import('../pages/Msite/Msite');
const Search = () => import('../pages/Search/Search');
const Order = () => import('../pages/Order/Order');
const Profile = () => import('../pages/Profile/Profile');


import Login from '../pages/Login/Login'
import Shops from '../pages/Shops/Shops'
import ShopGoods from '../pages/Shops/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shops/ShopRatings/ShopRatings'
import ShopInfo from '../pages/Shops/ShopInfo/ShopInfo'
Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/msite',
      component: Msite,
      meta: {
        isShow: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        isShow: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        isShow: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        isShow: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shops',
      component: Shops,
      children: [
        {
          path: '/shops/goods',
          component: ShopGoods
        },
        {
          path: '/shops/ratings',
          component: ShopRatings
        },
        {
          path: '/shops/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shops/goods'
        }
      ]
    },
    {
      path: '/',
      redirect: '/msite',
    }
  ]
})
