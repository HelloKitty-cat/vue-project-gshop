/*
  包含n个直接更新状态的数据
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERS,
  RESET_USERS,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  REDUCE_FOOD_COUNT,
  ADD_FOOD_COUNT
} from './mutations-Types'

export default {
  [RECEIVE_ADDRESS] (state,{address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state,{categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state,{shops}) {
    state.shops = shops
  },
  [RECEIVE_USERS] (state,{users}) {
    state.users = users
  },
  [RESET_USERS] (state) {
    state.users = {}
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [ADD_FOOD_COUNT] (state,{food}) {
    if (food.count){
      food.count++
    } else {
      //food.count = 1 // 没有数据绑定==> 不会更新界面
      Vue.set(food,'count',1)
      state.shopCart.push(food)
    }
  },
  [REDUCE_FOOD_COUNT] (state,{food}) {
    if (food.count){
      food.count--;
      if (food.count === 0){
        // 一旦减为0时, 从购物车中删除food
        state.shopCart.splice(state.shopCart.indexOf(food),1)
      }
    }
  },
}
