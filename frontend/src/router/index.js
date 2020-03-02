import Vue from "vue";
import VueRouter from "vue-router";
import Lajme from "../views/Lajme.vue";
import Ekonomi from "../views/Ekonomi.vue";
import Teknologji from "../views/Teknologji.vue";
import Kultura from "../views/Kultura.vue";
import Shendetesi from "../views/Shendetesi.vue";
import Sport from "../views/Sport.vue";
import Fun from "../views/Fun.vue";
import Auto from "../views/Auto.vue";
import Login from "../views/Login.vue";
import PostById from "../views/PostById.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Lajme",
    component: Lajme
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard
  },
  {
    path: "/ekonomi",
    name: "Ekonomi",
    component: Ekonomi
  },
  {
    path: "/teknologji",
    name: "Teknologji",
    component: Teknologji
  },
  {
    path: "/kultura",
    name: "Kultura",
    component: Kultura
  },
  {
    path: "/fun",
    name: "Fun",
    component: Fun
  },
  {
    path: "/auto",
    name: "Auto",
    component: Auto
  },
  {
    path: "/shendetesi",
    name: "Shendetesi",
    component: Shendetesi
  },
  {
    path: "/sport",
    name: "Sport",
    component: Sport
  },
  {
    path: "/:id",
    name: "PostById",
    component: PostById
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
