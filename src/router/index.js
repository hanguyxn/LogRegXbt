import { createRouter, createWebHistory } from 'vue-router'
import { previousPageTitle } from '@/stores/navigation.js'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/Login.vue'),
      meta: { title: 'Đăng nhập' },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/Register.vue'),
      meta: { title: 'Đăng ký' },
    },
    {
      path: '/',
      name: 'home',
      meta: { title: 'Trang chủ' },
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/product/View.vue'),
      meta: { title: 'Sản phẩm' },
    },
    {
      path: '/products/detail',
      name: 'productDetail',
      component: () => import('@/views/product/Detail.vue'),
      meta: { title: 'Thông tin sản phẩm' },
    },
    {
      path: '/products/add',
      name: 'addProduct',
      component: () => import('@/views/product/Add.vue'),
      meta: { title: 'Thêm sản phẩm' },
    },
    {
      path: '/products/variant',
      name: 'productVariant',
      component: () => import('@/views/product/Variant.vue'),
      meta: { title: 'Biến thể' },
    },
    {
      path: '/employee',
      name: 'employee',
      component: () => import('@/views/employee/View.vue'),
      meta: { title: 'Nhân viên' },
    },
    {
      path: '/employee/detail',
      name: 'employeeDetail',
      component: () => import('@/views/employee/Detail.vue'),
      meta: { title: 'Thông tin nhân viên' },
    },
    {
      path: '/role',
      name: 'role',
      component: () => import('@/views/employee/Role.vue'),
      meta: { title: 'Vai trò' },
    },
    {
      path: '/order/create',
      name: 'createOrder',
      component: () => import('@/views/order/Create.vue'),
      meta: { title: 'Tạo đơn hàng' },
    },
    ,
    {
      path: '/order/view',
      name: 'viewOrder',
      component: () => import('@/views/order/View.vue'),
      meta: { title: 'Đơn hàng' },
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (from.meta.title) {
    previousPageTitle.value = from.meta.title
  }
  const domain = 'localhost'
  document.title = `${to.meta.title} - ${domain}` || `Trang chủ - ${domain}`
  next()
})

export default router
