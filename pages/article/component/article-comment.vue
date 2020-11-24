<!--
 * @Author: LeeHuiXian
 * @version: 
 * @Date: 2020-11-24 13:27:26
 * @LastEditors: LeeHuiXian
 * @LastEditTime: 2020-11-24 13:47:17
 * @FilePath: /realworld-nuxtjs/pages/article/component/article-comment.vue
 * @Description: 文章评论组件
-->
<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
        Post Comment
        </button>
      </div>
    </form>
        
    <div
      class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }"
          class="comment-author"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD,YYYY')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticleComments } from '@/api/article'

export default {
  name: 'ArticleComment',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      comments: [] // 评论列表
    }
  },
  computed: {
    ...mapState(['user']),
  },
  async mounted() {
    const { data } = await getArticleComments(this.article.slug)
    this.comments = data.comments
  }
}
</script>

<style>

</style>