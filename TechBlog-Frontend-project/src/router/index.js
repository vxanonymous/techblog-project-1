import Vue from 'vue'
import VueRouter from 'vue-router'
import HealthCheck from '../components/HealthCheck.vue'
import Login from '../components/LoginPage.vue'
import SignUp from '../components/SignUp.vue'
import HomePage from '../components/HomePage.vue'
import NewBlog from '../components/NewBlog.vue'
import DetailBlog from '../components/DetailBlog.vue'
import AdminBlog from '../components/AdminBlog.vue'
import BlogManagement from '../components/BlogManagement.vue'
import EditBlog from '../components/EditBlog.vue'
import Profile from '../components/Profile.vue'
import jwtDecode from 'jwt-decode'

Vue.use(VueRouter)

const routes = [
  {
    path: "/healthcheck",
    name: "HealthCheck",
    component: HealthCheck
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/",
    name: "Homepage",
    component: HomePage
  },
  {
    path: "/blog/new",
    name: "NewBlog",
    component: NewBlog,
    meta: {requiresAuth: true}
  },
  {
    path: "/blog/edit/:id",
    name: "EditBlog",
    component: EditBlog,
    meta: {requiresAuth: true}
  },
  {
    path: "/blog/:id",
    name: "DetailBlog",
    component: DetailBlog
  },
  {
    path: "/blogs/management/admin",
    name: "AdminBlog",
    component: AdminBlog,
    meta: {requiresAuthAdmin: true}
  },
  {
    path: "/blogs/management",
    name: "BlogManagement",
    component: BlogManagement,
    meta: {requiresAuth: true}
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    meta: {requiresAuth: true}
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach( (to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: "/login",
        query: {redirect: to.fullPath}
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresAuthAdmin)) {
    const role = jwtDecode(token).role;

    if (role != 'ADMIN') {
      next({
        path: "/login",
        query: {redirect: to.fullPath}
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
