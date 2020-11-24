<!--
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-11-18 20:57:06
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-11-24 13:39:13
 * @FilePath: /realworld-nuxtjs/pages/Article/index.vue
 * @Description: 
-->
<template>
<div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{ article.title }}</h1>

      <article-meta :article="article" />
    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body"></div>
    </div>

    <hr />

    <div class="article-actions">
      <article-meta :article="article" />
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <article-comment :article="article" />
        
      </div>

    </div>

  </div>

</div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './component/article-meta'
import ArticleComment from './component/article-comment'

export default {
  name: 'ArticleIndex',
  head() {
    return  {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'dedescriptionsc',
          content: this.article.description
        }
      ]
    }
  },
  async asyncData({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article: data.article
    }
  },
  components: {
    ArticleMeta,
    ArticleComment
  }
}
</script>

<style>

</style>