/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-11-23 13:14:42
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-11-23 13:19:24
 * @FilePath: /realworld-nuxtjs/plugins/dayJs.js
 * @Description: 日期格式化过滤器
 */

import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date', (value, format="YYYY-MM-DD HH:mm:ss") => {
  return dayjs(value).format(format)
})