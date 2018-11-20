/*
包含n个接口请求函数的模块
函数的返回值是promise对象
 */
import ajax from './ajax'

const BASE = '/api';

//更具经纬度获取地址
export const reqAddress = (latitude,longitude) => ajax(BASE+`/position/${latitude},${longitude}`);

//获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE+'/index_category');

//根据经纬度获取商铺列表
export const reqShopsList = ({latitude,longitude}) =>ajax(BASE+'/shops',{latitude,longitude});

//发送短信验证码
export const reqSendCode = (phone) => ajax(BASE + '/sendcode', {phone});

//用户名密码登陆
export const reqLoginPwd = ({name,pwd,captcha}) => ajax(BASE+'/login_pwd',{name,pwd,captcha},'POST');

//短信登陆
export const reqLoginSms = (phone,code) => ajax(BASE+'/login_sms',{phone,code},'POST');


//根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE+ '/userinfo');

//用户登出
export const reqLogout = () => ajax(BASE+ '/logout');
