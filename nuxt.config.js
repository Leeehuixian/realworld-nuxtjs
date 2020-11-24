/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-11-11 13:09:36
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-11-23 13:19:49
 * @FilePath: /realworld-nuxtjs/nuxt.config.js
 * @Description: 
 */
module.exports = {
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      routes.splice(0) // 清空 Nuxt.js 基于 pages 目录默认生成的路由规则表
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
          ]
        }
      ])
    }
  },

  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ],

  server: {
    host: '0.0.0.0',
    port: 3000
  },
}
