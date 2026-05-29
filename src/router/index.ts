import { createRouter, createWebHistory } from 'vue-router'
import ProductosView from '../views/ProductosView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/productos',
      name: 'productos',
      component: ProductosView,
    },
  ],
})

export default router
