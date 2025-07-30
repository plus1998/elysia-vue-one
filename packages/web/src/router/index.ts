import { createRouter, createWebHistory } from 'vue-router'
import { authClient } from '../lib/auth'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  try {
    // 检查用户登录状态
    const session = await authClient.getSession()
    const isAuthenticated = !!session.data

    // 如果路由需要认证但用户未登录
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login')
      return
    }

    // 如果路由需要游客状态但用户已登录
    if (to.meta.requiresGuest && isAuthenticated) {
      next('/home')
      return
    }

    next()
  } catch (error) {
    console.error('路由守卫检查失败:', error)
    // 出错时，如果是需要认证的路由，跳转到登录页
    if (to.meta.requiresAuth) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
