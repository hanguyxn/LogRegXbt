import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import("../views/Login.vue"),
      meta: { title: "Đăng nhập" }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("../views/Register.vue"),
      meta: { title: "Đăng ký" }
    },
    {
      path: '/',
      name: 'home',
      component: () => import("../views/Home.vue")
    },
    {
      path: '/products',
      name: 'products',
      component: () => import("../views/Products.vue"),
      meta: { title: 'Sản phẩm' }
    },
    {
      path: "/staffs",
      name: "staffs",
      component: () => import("../views/Staff.vue"),
      meta: {title: 'Nhân viên'}
    }
  ],
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Trang chủ'
  next()
})
export default router
