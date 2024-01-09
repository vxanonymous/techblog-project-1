<template>
  <div style="box-shadow: 0px 0px 15px rgb(0 0 0 / 20%);">
    <b-navbar toggleable="lg" type="dark" variant="dark" style="padding-left: 5%; padding-right: 5%;">
      <b-navbar-brand href="/"><img src="../assets/blogger.svg" alt="Logo" style="border-radius: 100%; width: 30px; height: 30px; margin-right: 10px;"> Home</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#/blog/new" v-if="authentication && role == 'USER'">+ New blog</b-nav-item>
          <b-nav-item href="#/blogs">Blogs</b-nav-item>
          <b-nav-item href="#/blogs/management" v-if="authentication && role == 'USER'">My blogs</b-nav-item>
          <b-nav-item href="#/blogs/management/admin" v-if="authentication && role == 'ADMIN'">Blog management</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form  style="margin-right: 40px;">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="keyword" style="width: 200px;"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="searchByName()"><i class="fa fa-search" aria-hidden="true"></i></b-button>
          </b-nav-form>

          <b-nav-item-dropdown right v-if="authentication">
            <template #button-content>
              <img style="width: 40px; height: 40px; border-radius: 100%; border: 1.5px solid white;" :src="avatar" alt="">
            </template>
            <b-dropdown-item :href="'#/profile/' + userId">{{username}}</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav is-nav v-if="authentication == false">
          <b-nav-item href="#/login">Login</b-nav-item>
          <b-nav-item href="#/signup">Sign up</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</div>
</template>

<script>
    
</script>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "Header.vue",
    data(){
      return{
        userId: "",
        username: "username",
        authentication: false,
        avatar: 'https://app-tech-blogs-backend.herokuapp.com/file/image/1660655959253-avatar.png',
        role: 'VIEWER',
        keyword: ""
      }
    },
    methods: {
      logout(){
        localStorage.removeItem('token')
        this.authentication = false
      },

      searchByName() {
        if (this.keyword != "") {
          this.$emit('searchByName', this.keyword)
        }
      }
    },
    created() {
      if(localStorage.getItem('token')){
        const data = jwt_decode(localStorage.getItem('token'))
        this.userId = data.id
        this.username = data.username
        this.authentication = true
        this.role = data.role
      }
    }
};
</script>

<style scoped>

</style>