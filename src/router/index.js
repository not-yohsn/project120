import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import test from '../views/test.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
    {
    path: '/testn',
    name: 'test',
    component: test
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
