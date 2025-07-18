import { createRouter, createWebHistory } from 'vue-router'
import CalculatorView from '../views/CalculatorView.vue'  // 引入计算器页面组件

const routes = [
  {
    path: '/',
    name: 'calculator',
    component: CalculatorView  // 默认路由指向计算器页面
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router