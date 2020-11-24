/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-11-18 21:22:20
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-11-22 00:14:18
 * @FilePath: /realworld-nuxtjs/plugins/request.js
 * @Description: 
 */
// 基于axios 封装的请求模块
import axios from 'axios'

export const request = axios.create({
  baseURL: 'http://realworld.api.fed.lagounews.com'
})

export default ({store}) => {
  // 请求拦截器
  request.interceptors.request.use(function (config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })
}



