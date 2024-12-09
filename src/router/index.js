import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/home.vue'
import Library from '@/pages/library.vue'
import Search from '@/pages/search.vue'
import BookDetails from '@/pages/book_details.vue'
import NotFound from '@/pages/not_found.vue'

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
    },
    {
      path: '/books/:id',
      name: 'book',
      component: BookDetails,
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
    }
  ],
})

export default router
