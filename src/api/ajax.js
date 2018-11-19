
/*
用于发送ajax请求的函数
包装axios
函数的返回值是promise对象
 */
import axios from 'axios'

export default function ajax(url,data={},method='GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (method === 'GET'){
      let queryString = '';
      Object.keys(data).forEach(key =>{
        const value = data[key]
        queryString+=`${key}=${value}&`
      })
      
      if (queryString!==''){
        queryString = queryString.substring(0,queryString.length-1)
        url+= '?' + queryString
      }
      promise = axios.get(url)
    } else {
      promise = axios.post(url,data)
    }
    promise
      .then(res => {
        resolve(res.data)  //返回的是数据(response),而不是promise对象
      })
      .catch(err =>{
        reject(err)
      })
  })
}
