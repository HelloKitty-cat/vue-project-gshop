/*
  包含n个间接更新状态的数据
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutations-Types'
import {reqAddress,reqFoodCategorys,reqShopsList} from '../api'

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
  }
}
