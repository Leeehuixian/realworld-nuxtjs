/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-11-18 22:49:38
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-11-22 00:14:03
 * @FilePath: /realworld-nuxtjs/api/user.js
 * @Description: 
 */

import {request} from '@/plugins/request'

// 登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}
