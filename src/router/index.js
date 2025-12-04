import { createRouter, createWebHistory } from 'vue-router'
import MainApp from '../views/MainApp.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/mainapp',
    name: 'mainapp',
    component: MainApp
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
