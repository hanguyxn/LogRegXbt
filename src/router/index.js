import { createRouter, createWebHistory } from 'vue-router'
import { previousPageTitle } from '@/stores/navigation.js';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import("@/views/auth/Login.vue"),
      meta: { title: "Đăng nhập" }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("@/views/auth/Register.vue"),
      meta: { title: "Đăng ký" }
    },
    {
      path: '/',
      name: 'home',
      meta: { title: 'Trang chủ' },
      component: () => import("@/views/Home.vue")
    },
    {
      path: '/products',
      name: 'products',
      component: () => import("@/views/product/View.vue"),
      meta: { title: 'Sản phẩm' }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import("@/views/cart/View.vue"),
      meta: { title: 'Đơn hàng' }
    },
    {
      path: '/products/add',
      name: 'addProduct',
      component: () => import("@/views/product/Add.vue"),
      meta: { title: 'Thêm sản phẩm' }
    },
    {
      path: "/employee",
      name: "employee",
      component: () => import("@/views/employee/View.vue"),
      meta: {title: 'Nhân viên'}
    },
    {
      path: "/role",
      name: "role",
      component: () => import("@/views/Role.vue"),
      meta: {title: "Vai trò"}
    },
    {
      path: '/profile',
      name: "profile",
      component: () => import("@/views/member/Profile.vue"),
      meta: {title: "Trang cá nhân"}
    }
  ],
})
router.beforeEach((to, from, next) => {
  if (from.meta.title) {
    previousPageTitle.value = from.meta.title;
  }
  const domain = 'localhost'
  document.title = `${to.meta.title} - ${domain}`  || `Trang chủ - ${domain}`
  next()
})

export default router
