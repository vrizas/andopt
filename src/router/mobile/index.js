import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../../views/mobile/user/HomeView.vue'

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
      component: () => import('../../views/mobile/user/MyProfileView.vue')
    },
    {
      path: '/my/pet/add',
      name: 'add-pet',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/user/AddPetView.vue')
    },
    {
      path: '/my/favorites',
      name: 'pet-favorites',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/user/MyFavoriteView.vue')
    },
    {
      path: '/my/lastseen',
      name: 'pet-lastseen',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/user/LastSeenView.vue')
    },
    {
      path: '/my/upload',
      name: 'pet-upload',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/user/MyUploadView.vue')
    },
    {
      path: '/profile/:id',
      name: 'user-profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/user/UserProfileView.vue')
    },
    {
      path: '/pet/:id',
      name: 'pet',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/user/PetView.vue')
    },
    {
      path: '/search/:query?/:location?',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/user/SearchView.vue')
    },
    {
      path: '/article/:id',
      name: 'article',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/user/ArticleView.vue')
    },
    {
      path: '/articles',
      name: 'all-articles',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../views/mobile/user/AllArticlesView.vue')
    }
  ]
})

export default router
