<template>
  <div>
    <HeaderVue />
    <div class="container mt-5 mb-5">
      <div>
        <h2>{{ title }}</h2>
        <a href="#" style="text-decoration: none; color: black;"><h6>By <span style=" font-style: italic;">{{ author.username }}</span></h6></a>
        <i style="opacity: 0.5;">{{ createdAt.substring(0, 10) }}</i>
        <br>
        <div v-html="content" class="mt-2 mb-2"></div>
      </div>
      <br>
      <div v-if="tags.length > 0">Tags: <a class="mr-2 tags-blog" v-for="i,k in tags" :key="k" href="#">#{{i}}</a></div>
    </div>
  </div>
</template>

<script>
import HeaderVue from '@/components/Header.vue';
import {getDetailBlog} from '@/services/services';
import {getUserInfo} from '@/services/services';

export default {
    name: "DetailBlog",
    components: {HeaderVue},
    data() {
      return {
        title: "",
        createdAt: "",
        author: "",
        content: "",
        tags: [],
        comments: [],
      }
    },
    created() {
      getDetailBlog(this.$route.params.id).then((res) => {
        this.title = res.data.title
        this.content = res.data.content
        this.createdAt = res.data.date
        this.author = res.data.author
        this.tags = res.data.tags
        this.comments = res.data.comments

        getUserInfo(this.author).then(response => {
          this.author = response.data
        })
      })
    }
}
</script>

<style>
.tags-blog {
  text-decoration: none;
  color: #bc8a51;
}
</style>