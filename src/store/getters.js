
/*
  包含n个计算属性
 */

export default {

  //购物车显示的数量
  totolCount (state) {
    return state.shopCart.reduce((pre,food) => pre + food.count , 0)
  },
  //购物车显示的价格
  totolPrice (state) {
    return state.shopCart.reduce((pre,food) => pre + food.count*food.price , 0)
  },

  //shopRating中全部评论的数量
  AllCount (state) {
    return state.ratings.length
  },
  //shopRating中满意评论的数量
  SatisfactionCount (state) {
   return state.ratings.reduce((pre,rating) => pre + (rating.rateType === 0 ? 1: 0),0)
  },
}
