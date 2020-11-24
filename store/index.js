/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-11-19 21:46:17
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-11-20 00:07:02
 * @FilePath: /realworld-nuxtjs/store/index.js
 * @Description: 
 */

const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数， 返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let user = null

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // NO valid cookie found
      }
    }

    // 提交 mutation 修改 state 状态
    commit('setUser', user)
  }
}