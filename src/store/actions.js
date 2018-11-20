/*
  包含n个间接更新状态的数据
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERS,
  RESET_USERS
} from './mutations-Types'
import {reqAddress,reqFoodCategorys,reqShopsList,reqUserInfo,reqLogout} from '../api'

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
  }
}
