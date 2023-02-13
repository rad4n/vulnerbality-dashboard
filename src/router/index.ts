import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import Home from "../views/Home.vue"
import ListReport from "../views/ListReport.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: (route) => ({ presetUrl: route.query.url }),
  },
  {
    path: "/list",
    name: "List",
    component: ListReport,
    props: (route) => ({ presetUrl: route.query.url }),
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  mode: "history",
})

export default router
