import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Manage from "../views/Manage.vue";
import Register from "../views/Register.vue";
import Article from "../views/Article.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/manage",
    name: "manage",
    component: Manage
  },

  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/articles/:id",
    component: Article
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/home", "/login", "/register"];
  const authRequired = !(
    publicPages.includes(to.path) || to.path.indexOf("/articles") != -1
  );
  const loggedIn = localStorage.getItem("NerdBro-User");

  // try to access a restricted page + not logged in
  if (authRequired && !loggedIn) {
    return next("/login");
  }
  next();
});

export default router;
