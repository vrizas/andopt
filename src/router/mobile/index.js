import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../../views/mobile/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/my',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/MyProfileView.vue')
    },
    {
      path: '/my/pet/add',
      name: 'add-pet',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/AddPetView.vue')
    },
    {
      path: '/my/favorites',
      name: 'pet-favorites',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/MyFavoriteView.vue')
    },
    {
      path: '/my/lastseen',
      name: 'pet-lastseen',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/LastSeen.vue')
    },
    {
      path: '/my/upload',
      name: 'pet-upload',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/MyUpload.vue')
    },
    {
      path: '/pet/:id',
      name: 'pet',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/PetView.vue')
    }
  ]
})

export default router
