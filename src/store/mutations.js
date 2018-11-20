/*
  包含n个直接更新状态的数据
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERS,
  RESET_USERS
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
  }
}
