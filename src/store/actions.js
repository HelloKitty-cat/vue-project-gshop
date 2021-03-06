/*
  包含n个间接更新状态的数据
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERS,
  RESET_USERS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_CART
} from './mutations-Types'
import {reqAddress,reqFoodCategorys,reqShopsList,reqUserInfo,reqLogout,reqShopInfo,reqShopGoods,reqShopRatings} from '../api'

export default {
  async getAddress ({commit,state}) {
    const {latitude,longitude} = state;
    const result = await reqAddress(latitude,longitude);
    if (result.code === 0){
      const address = result.data;
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  async getFoodCategorys ({commit}) {
    const result = await reqFoodCategorys();
    if (result.code === 0){
      const categorys = result.data;
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  async getShops ({commit,state}) {
    const {latitude,longitude} = state;
    const result = await reqShopsList({latitude,longitude});
    if (result.code === 0){
      const shops = result.data;
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  // 同步action
  saveUsers ({commit},users) {
    commit(RECEIVE_USERS,{users})
  },
  //异步获取用户信息(session长久登录)
  async getUserInfo ({commit}) {
    const result = await reqUserInfo()

    if (result.code === 0){
      const users = result.data;
      commit(RECEIVE_USERS,{users})
    }
  },
  async logout ({commit}) {
    const result = await reqLogout();
    if(result.code === 0){
      commit(RESET_USERS)
    }
  },
  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

// 异步获取商家评价列表
  async getShopRatings({commit}) {
    const result = await reqShopRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit},cb) {
    const result = await reqShopGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      typeof cb === 'function' && cb()
    }
  },

  //定义更新count的同步actions
  updataFoodCount ({commit},{food,isAdd}) {
    if (isAdd){
      //加
      commit(ADD_FOOD_COUNT,{food})
    } else {
      //减
      commit(REDUCE_FOOD_COUNT,{food})
    }
  },

  //清空购物车的同步actions
  clearCart ({commit}) {
    commit(CLEAR_CART)
  }
}
