import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'UserLayout',
    component: () => import('../views/UserLayoutView.vue'),
    children: [
      {
        path: '',
        name: 'UserHome',
        component: () => import('../views/UserHomeView.vue')
      },
      {
        path: 'products',
        name: 'UserProducts',
        component: () => import('../views/UserProductsView.vue')
      },
      {
        path: 'cart',
        name: 'UserCart',
        component: () => import('../views/UserCartView.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'AdminLayout',
    component: () => import('../views/AdminDashboardView.vue'),
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/AdminProductsView.vue')
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../views/AdminOrdersView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'AdminLogin',
    component: () => import('../views/AdminLoginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
