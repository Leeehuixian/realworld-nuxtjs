/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-11-21 20:58:50
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-11-21 21:05:58
 * @FilePath: /realworld-nuxtjs/middleware/noAuthenticated.js
 * @Description: 校验登录的中间件
 */

export default function({ store, redirect }) {
  if (store.state.user) {
    return redirect('/')
  }
}