import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/portfolios',
    name: 'portfolios',
    component: () => import('../views/PortfoliosView.vue')
  },
  {
    path: '/expense',
    name: 'expense',
    component: () => import('../views/ExpenseView.vue')
  },
  {
    path: '/financial-statements',
    name: 'financialStatements',
    component: () => import('../views/FinancialStatementsView.vue')
  },
  {
    path: '/chart/:ticker',
    name: 'chart',
    component: () => import('../views/ChartView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
