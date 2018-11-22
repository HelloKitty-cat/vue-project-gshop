
/*
  包含n个计算属性
 */

export default {
  totolCount (state) {
    return state.shopCart.reduce((pre,food) => pre + food.count , 0)
  },
  totolPrice (state) {
    return state.shopCart.reduce((pre,food) => pre + food.count*food.price , 0)
  }
}
