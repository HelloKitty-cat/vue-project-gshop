<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="Phone">
              <button :disabled="!isRightNumber || Countdown > 0" class="get_verification"
                      :class="{right_phone_number: isRightNumber && hasClass}"
                      @click.prevent="sendCode">{{Countdown > 0 ? `已发送${Countdown}s` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button" @click="isShowPwd = !isShowPwd" :class="isShowPwd ? 'on' : 'off'">
                  <div class="switch_circle" :class="{rightMove: isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" ref="captcha" src="http://localhost:5000/captcha" alt="captcha" @click="updateCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
  import {reqSendCode,reqLoginPwd,reqLoginSms} from '../../api'
  import {Toast,MessageBox } from 'mint-ui'

  export default {
    data () {
      return {
        loginWay: true,  //true为短信登录,false为密码登录
        Phone: '',  //输入框(手机号)
        Countdown: 0,  //倒计时计数
        isShowPwd: false,  //false 为隐藏密码   true为显示密码
        hasClass: true,  //true是拥有  false未拥有
        code: '', // 验证码
        name: '', // 用户名
        pwd: '', // 密码
        captcha: '' //图形验证码
      }
    },
    computed: {
      //验证手机号是否正确
      isRightNumber () {
        return /^1\d{10}$/.test(this.Phone)
      }
    },
    methods: {
      //短信倒计时
      async sendCode () {
        this.Countdown = 30;
        this.hasClass = false;
        const timer = setInterval(() =>{
          this.Countdown--;
          if (this.Countdown <= 0){
            this.Countdown = 0;
            //清空定时器
            clearInterval(timer)
            this.hasClass = true;
          }
        },1000);

        //发送ajax请求
        const result = await reqSendCode(this.Phone);
        if (result.code === 0){
          //请求成功
          Toast({
            message: '短信已发送',
            position: 'middle',
            duration: 1000
          });
        } else {
          //请求失败
          this.Countdown = 0;
          MessageBox.alert(result.msg,'提示');
        }
      },
      //更新图形验证码
      updateCaptcha () {
        this.$refs.captcha.src = 'http://localhost:5000/captcha?time'+Date.now()
      },
      async login () {
        //from表单检查
        const {Phone,code,name,pwd,captcha,loginWay} = this;
        let result;
        if (loginWay){  // 短信登录
          if (!this.isRightNumber) { //不是正确的Phone才触发
            return MessageBox.alert('请输入正确的手机号码')
          }else if (!/^\d{6}$/.test(code)){
            return MessageBox.alert('验证码为6位数字')
          }
          //发送ajax请求
          result = await reqLoginSms(Phone,code);
        } else { // 密码登录
          if (!name){
            return MessageBox.alert('用户名格式错误')
          } else if (!pwd){
            return MessageBox.alert('密码格式错误')
          } else if (!captcha){
            return MessageBox.alert('验证码有误')
          }
          //发送ajax请求
          result = await reqLoginPwd({name,pwd,captcha});
        }
        //判断返回的响应
        if (result.code === 0){   //登录成功
          //保存用户数据
          this.$store.dispatch('saveUsers',result.data)
          //跳转到个人中心界面
          this.$router.replace('/profile')
        } else {  // 登录失败
           MessageBox.alert('登录失败')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
              .right_phone_number
                color #000000
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.rightMove
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
