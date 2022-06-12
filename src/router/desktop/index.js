import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../../views/desktop/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/my/:tab?',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/desktop/ProfileView.vue')
    },
    {
      path: '/my/pet/add',
      name: 'add-pet',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/desktop/AddPetView.vue')
    },
    {
      path: '/my/pets',
      name: 'pets',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/desktop/ProfileView.vue')
    },
    {
      path: '/pet/:id',
      name: 'pet',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/desktop/PetView.vue')
    },
    {
      path: '/search/:query?/:location?',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/desktop/SearchView.vue')
    }
  ]
})

export default router
