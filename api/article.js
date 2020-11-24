/*
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-11-21 21:08:59
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-11-24 13:30:11
 * @FilePath: /realworld-nuxtjs/api/article.js
 * @Description: 文章相关api
 */
import {request} from '@/plugins/request'

// 文章列表
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 用户关注文章列表
export const getFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

// 添加点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}

// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}

// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}

// 获取文章评论
export const getArticleComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })
}
