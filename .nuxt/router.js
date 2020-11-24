import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4925baad = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _c9c88dbc = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _6ed898f4 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _391ba6e6 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _3d56e0f0 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _9b34045a = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))
const _68c88af4 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _4925baad,
    children: [{
      path: "",
      component: _c9c88dbc,
      name: "home"
    }, {
      path: "/login",
      component: _6ed898f4,
      name: "login"
    }, {
      path: "/register",
      component: _6ed898f4,
      name: "register"
    }, {
      path: "/settings",
      component: _391ba6e6,
      name: "settings"
    }, {
      path: "/editor",
      component: _3d56e0f0,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _9b34045a,
      name: "article"
    }, {
      path: "/profile/:username",
      component: _68c88af4,
      name: "profile"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
