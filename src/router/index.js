import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/home.vue'
import Library from '@/pages/library.vue'
import Search from '@/pages/search.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/library',
      name: 'library',
      component: Library,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    }
  ],
})

export default router
