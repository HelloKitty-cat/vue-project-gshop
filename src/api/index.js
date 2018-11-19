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
export const reqShopsList = ({latitude,longitude}) =>ajax(BASE+'/shops',{latitude,longitude})
