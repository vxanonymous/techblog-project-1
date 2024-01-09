<template>
  <div>
    <HeaderVue @searchByName="this.search"/>
    <div>
      <list-blog-vue @getBlogsByPage="this.getBlogsByPage" :list_blog="expected_blogs" :totalPage="totalPage" />
    </div>
    <FooterVue/>
  </div>
</template>

<script>
import HeaderVue from './Header.vue';
import ListBlogVue from './ListBlog.vue';
import FooterVue from './Footer.vue';
import { getPublishedBlogsWithPage } from '../services/services';

export default {
  name: "HomePage",
  components: { HeaderVue, ListBlogVue, FooterVue },
  data() {
    return {
      blogs: [],
      publishedBlogs: [],
      totalPage: 0
    }
  },
  methods: {
    search(keyword) {
      this.publishedBlogs = Array.from(this.blogs).filter(blog => blog.title.toLowerCase().includes(keyword.toLowerCase()));
    },

    getBlogsByPage(page) {
      getPublishedBlogsWithPage(page).then((res) => {
        if (res.status == 200) {
          this.blogs = res.data;
          this.publishedBlogs = res.data;
          this.totalPage = this.publishedBlogs.pop().total;
        }
      })
    }
  },
  computed: {
    expected_blogs() {
      return this.publishedBlogs;
    }
  },
  created() {
    getPublishedBlogsWithPage(0).then((res) => {
      if (res.status == 200) {
        this.blogs = res.data;
        this.publishedBlogs = res.data;
        this.totalPage = this.publishedBlogs.pop().total;
      }
    })
  }
}
</script>

<style>

</style>