<template>
  <div>
    <div class="goods">
      <!--左侧类表-->
      <div class="menu-wrapper">
        <ul ref="LeftUl">
          <li class="menu-item" v-for="(good,index) in goods"
              :key="index"
              :class="{current: index === currentIndex}"
              @click="clickItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon">
              {{good.name}}</span>
          </li>
        </ul>
      </div>

      <!--右侧列表-->
      <div class="foods-wrapper">
        <ul ref="RightUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index" >
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" @click="showFood(food)" :key="index">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <ShopCart />
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CartControl from '../../../components/CartControl/CartControl'
  import ShopCart from '../../../components/ShopCart/ShopCart'
  import Food from '../../../components/Food/Food'
  export default {
    data () {
      return {
        scrollY: 0, // 右侧列表y轴方向滑动的位置
        tops: [], // 右侧所有分类li标签的高度
        food: {}  // 点击li要显示的食物列表
      }
    },
    computed: {
      ...mapState(['goods']),

      currentIndex () {
        const {scrollY,tops} = this

        // 通过scrollY得到对应区域的index 通过currentIndex去改变对象显示的类名
        const index = tops.findIndex((top,index) =>{
          //scrollY需要大于等于当前的索引,小于下个索引
          return scrollY >= top && scrollY < tops[index+1]
        })

        /*
          在this组件对象上定义一个index属性，每次和我们查找出来的index比较，如果相同则没有必要
          向上滚动
          如果不同,先保存index到this.index上,好进行下一次比较,然后让我的通过findIndex查找的到的index
          获取当前index的左侧li，让他尽量滚动到最上面 (当我滑到一定程度后，其他的列表均可看见的时候，就不需要在滚动到最上面了,
          只需要往下移动就可以了)
        */
        if (this.index !== index && this.leftScroll){

         console.log(this.index,index);  // 0 1
          this.index = index
          this.leftScroll.scrollToElement(this.$refs.LeftUl.children[index],200)  //移动到第一个li上，在可视区域内
        }
        return index;
      }
    },
    mounted () {
      this.$store.dispatch('getShopGoods',()=>{
        this.$nextTick(()=>{
          //滑动逻辑执行
          this._initScroll()
          this._initTops()
        })
      })
    },
    methods: {
      _initScroll () {
        // 创建我的左侧列表滑动对象
        this.leftScroll = new BScroll('.menu-wrapper',{
          click: true
        });
        // 创建右侧列表滑动对象
         this.rightScroll = new BScroll('.foods-wrapper',{
          probeType: 3
        });
        //滚动时给scrollY赋值
        this.rightScroll.on('scroll',({x,y}) => {
          this.scrollY = Math.abs(y)
        })
        //滚动结束时给scrollY赋值
        this.rightScroll.on('scrollEnd',({x,y}) => {
          this.scrollY = Math.abs(y)
        })
      },
      //获取每个li所有的高度
      _initTops () {
        const lis = this.$refs.RightUl.getElementsByClassName('food-list-hook');

        const tops = [];
        let top = 0;
        tops.push(top);
        Array.prototype.slice.call(lis).forEach(li =>{
          top += li.clientHeight
          tops.push(top)
        })
        //更新tops的状态数据
        this.tops = tops;
        console.log(tops);
      },

      clickItem (index) {
        //得到目标位置的滚动坐标
        const y = -this.tops[index]
        //更新scrollY的状态
        /*
          因为我currentIndex需要我的scrollY去得出我对应的下标，由于我的scrollY是一点一点在变化的
          所以我们需要立即设置一个状态，让currentIndex立即确定，改变currentIndex，让对应的左侧li拥有类名
          则解决计算属性导致的卡顿问题
         */
        this.scrollY = -y
        //让右侧列表平滑到目标位置
        this.rightScroll.scrollTo(0,y,200)
      },

      showFood (food) {
        this.food = food;

        this.$refs.food.toggleShow();
      }
    },
    components: {
      CartControl,
      ShopCart,
      Food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 224px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

