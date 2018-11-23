<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(star,index) in starClasses" :key="index" :class="star"></span>
  </div>
</template>

<script>
  export default {
    props: {
      size: Number,
      rating: Number
    },
    computed: {
      starClasses () {
        const {rating} = this;
        const ratingInteger = Math.floor(rating)  //整数
        let arr = [];
        //取整数循环往arr中推送类名 'on'
        for (let i=0;i<ratingInteger;i++){
          arr.push('on')
        }
        //如果我的rating 减去我的整数  得到要是大于0.5 则说明显示的是半星  又因为js小数会出现精度丢失  所以都乘以10
        if (rating*10 - ratingInteger*10 > 5){
          arr.push('half')
        }
        //最后则是要是我的数组长度还是小于5的话，则说明后面的全是无星的图片
        while (arr.length < 5){
          arr.push('off')
        }
        //将包含类名的数组return出去
        return arr
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
