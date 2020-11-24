<!--
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-11-11 13:13:05
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-11-23 23:37:05
 * @FilePath: /realworld-nuxtjs/pages/home/index.vue
 * @Description: 
-->
<template>
<div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li v-if="user" class="nav-item">
              <nuxt-link
                class="nav-link"
                :class="{ active: tab === 'your_feed'}"
                exact
                :to="{
                  name: 'home',
                  query: {
                    tab: 'your_feed'
                  }
                }"
              >Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                :class="{ active: tab === 'global_feed'}"
                exact
                :to="{
                  name: 'home',
                  query: {
                    tab: 'global_feed'
                  }
                }"
              >Global Feed</nuxt-link>
            </li>
            <li v-if="tag" class="nav-item">
              <nuxt-link
                class="nav-link"
                :class="{ active: tab === 'tag'}"
                exact
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: tag
                  }
                }"
              >#{{ tag }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div
          class="article-preview"
          v-for="article in articles"
          :key="article.slug"
        >
          <div class="article-meta">
            <nuxt-link
              :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }"
            >
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link
                class="author"
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }"
              >
                {{ article.author.username }}
              </nuxt-link>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button
              class="btn btn-outline-primary btn-sm pull-xs-right"
              :class="{ active: article.favorited }"
              :disabled="article.favortiedDisabled"
              @click="onFavorite(article)"
            >
              <i class="ion-heart"></i> {{ article.favoritesCount }}
            </button>
          </div>
          <nuxt-link
            :to="{
              name: 'article',
              params: {
                slug: article.slug
              }
            }"
          >
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>

        <!-- 分页列表 -->
        <nav>
          <ul class="pagination">
            <li
              class="page-item"
              :class="{
                active: item === page
              }"
              v-for="item in totalPage"
              :key="item"
            >
              <nuxt-link
                class="page-link"
                :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag: tag,
                    tab: tab
                  }
                }"
              >
                {{ item }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <!-- /分页列表 -->

      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link
              :to="{
                name: 'home',
                query: {
                  tag: item,
                  tab: 'tag'
                }
              }"
              class="tag-pill tag-default"
              v-for="item in tags"
              :key="item"
            >{{ item }}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
  addFavorite,
  deleteFavorite
} from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'

export default {
  name: 'HomeIndex',
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 50
    const tag = query.tag
    const tab= query.tab || 'global_feed'
    const loadArticles = store.state.user &&  tab === 'your_feed'
      ? getFeedArticles
      : getArticles
    const [ articlesRes, tagsRes ] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])
    const { articles, articlesCount } = articlesRes.data
    const tags = tagsRes.data.tags.splice(0, 10)

    articles.forEach(article => article.favortiedDisabled = false)

    return {
      articles,
      articlesCount,
      tags,
      page,
      limit,
      tag,
      tab
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onFavorite(article) {
      article.favortiedDisabled = true
      if (article.favorited) {
        // 已经点赞的取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        // 没有点赞的添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favortiedDisabled = false
    }
  }
}
</script>

<style>

</style>