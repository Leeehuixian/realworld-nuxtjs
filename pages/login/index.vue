<!--
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-11-18 13:51:57
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-11-21 21:06:39
 * @FilePath: /realworld-nuxtjs/pages/Login/index.vue
 * @Description: 登录
-->
<template>
<div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up'}}</h1>
        <p class="text-xs-center">
          <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
          <nuxt-link v-else to="/login">Have an account?</nuxt-link>
        </p>

        <ul class="error-messages">
          <template v-for="(messages, field) in errors">
            <li v-for="(message, index) in messages" :key="index">{{ field }}{{ message }}</li>
          </template>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset v-if="!isLogin" class="form-group">
            <input class="form-control form-control-lg" v-model="user.username" type="text" placeholder="Your Name" required>
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" v-model="user.email" type="email" placeholder="Email" required>
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" v-model="user.password" type="password" placeholder="Password" required minlength="8">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{ isLogin ? 'Sign in' : 'Sign up'}}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { login, register } from '@/api/user'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'noAuthenticated',
  name: 'LoginIndex',
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  },
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {} // 错误信息
    }
  },

  methods: {
    async onSubmit () {
      try {
        // 提交表单请求登录
        const { data } = this.isLogin
        ? await login({
            user: this.user
          })
        : await register({
            user: this.user
          })

        // TODO 保存用户的登录状态
        this.$store.commit('setUser', data.user)
        Cookie.set('user', data.user)
        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        console.dir(err)
        this.errors = err.response.data.errors
      }
    }
  }
}
</script>

<style>

</style>