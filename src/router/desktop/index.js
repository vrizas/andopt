import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../../views/desktop/user/HomeView.vue'

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
      component: () => import('../../views/desktop/user/MyProfileView.vue')
    },
    {
      path: '/my/pet/add',
      name: 'add-pet',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/desktop/user/AddPetView.vue')
    },
    {
      path: '/profile/:id',
      name: 'user-profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/desktop/user/UserProfileView.vue')
    },
    {
      path: '/pet/:id',
      name: 'pet',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/desktop/user/PetView.vue')
    },
    {
      path: '/search/:query?/:location?',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/desktop/user/SearchView.vue')
    },
    {
      path: '/spv/:tab?/:secTab?',
      name: 'spv-panel',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/desktop/spv/SpvView.vue')
    }
  ]
})

export default router
