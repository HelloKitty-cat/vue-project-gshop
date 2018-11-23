<template>
  <div class="msite">
    <MainHeader :title="address.name">
        <span class="header_search" slot="left" @click="$router.replace('/search')">
          <i class="iconfont icon-sousuo"></i>
        </span>
      <span class="header_login" slot="right" v-show="!users._id">
          <span class="header_login_text">登录|注册</span>
        </span>
    </MainHeader>
    <div class="miste-content-wrapper">
      <div class="miste-content">
        <!--首页导航-->
        <nav class="msite_nav border-1px">
          <div class="swiper-container" v-if="categorys.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src="'https://fuss10.elemecdn.com' + category.image_url"">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="loading">
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list border-1px">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <ShopList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ShopList from '../../components/ShopList/ShopList'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import {mapState} from 'vuex'
  import Bscroll from 'better-scroll'
  export default {
    mounted () {
      //获取我的categorys和shops
      this.$store.dispatch('getFoodCategorys')
      this.$store.dispatch('getShops')

    },
    computed: {
      ...mapState(['address','categorys','users']),

      categorysArr () {
        const {categorys} = this;

        let arr = []
        //内部小数组,长度最大为8
        let smallArr = []

        categorys.forEach(item => {

          if (smallArr.length === 0){  //只需要添加一次
            arr.push(smallArr)
          }
          //将categorys里的信息保存到小数组中
          smallArr.push(item)
          //一旦小数组大于8了，则需要开启另一个小数组
          if (smallArr.length === 8){
            smallArr = []
          }
        });

        return arr
      }
    },
    watch: {
      //更新状态数据 => 调用监视的回调函数 => 异步更新界面
      categorys () {  //categorys的状态更新了
        //将回调延迟到下次 DOM 更新循环之后执行。
        this.$nextTick (() =>{
          //必须在列表数据页面显示之后才创建
          new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
          new Bscroll('.miste-content-wrapper',{click: true})
        })
      }
     },
    components: {
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite
    width 100%
    height: 100%
    .miste-content-wrapper
      position fixed
      top: 45px
      bottom: 46px
      width: 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0 10px
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
