/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-11-21 21:08:59
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-11-22 00:15:25
 * @FilePath: /realworld-nuxtjs/api/tag.js
 * @Description: 文章相关api
 */
import {request} from '@/plugins/request'

export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags'
  })
}
