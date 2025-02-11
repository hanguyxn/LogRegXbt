import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: "Đăng nhập" }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("../views/Register.vue"),
      meta: { title: "Đăng ký" }
    },
  ],
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Trang chủ'
  next()
})
export default router
