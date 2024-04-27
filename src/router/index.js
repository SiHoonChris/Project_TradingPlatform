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
    path: '/transactions',
    name: 'transactions',
    component: () => import('../views/TransactionsView.vue')
  },
  {
    path: '/financial-statements',
    name: 'financialStatements',
    component: () => import('../views/FinancialStatementsView.vue')
  },
  {
    path: '/trade/:ticker',
    name: 'trade',
    component: () => import('../views/TradeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
