<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import LoginPopupVue from './popup/LoginPopup.vue'
import RegisterPopUpVue from './popup/RegisterPopup.vue'
import ResetPasswordPopupVue from './popup/ResetPasswordPopup.vue'

defineProps({
  isLoggedIn: Boolean
})

const route = useRoute()

const routes = {
  '/login': LoginPopupVue,
  '/register': RegisterPopUpVue,
  '/reset-password': ResetPasswordPopupVue
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => routes[currentPath.value.slice(1) || '/'])

const showIndicator = () => {
  return route.name === 'home' || route.name === 'add-pet' || route.name === 'pet-favorites' || route.name === 'profile'
}
</script>

<template>
  <div>
    <nav class="flex justify-between w-full fixed z-50 bottom-0 left-0 right-0 bg-white text-lg shadow-andopt text-darkGray max-w-[600px] m-auto">
      <RouterLink
        to="/"
        class="flex flex-col justify-center items-center gap-1 w-1/4 h-14"
        :class="{ active: $route.name === 'home' }"
      >
        <font-awesome-icon icon="house" />
        <span class="text-xs">Beranda</span>
      </RouterLink>
      <RouterLink
        to="/my/pet/add"
        class="flex flex-col justify-center items-center gap-1 w-1/4 h-14"
        :class="{ active: $route.name === 'add-pet' }"
      >
        <font-awesome-icon icon="circle-plus" />
        <span class="text-xs">Unggah</span>
      </RouterLink>
      <RouterLink
        to="/my/favorites"
        class="flex flex-col justify-center items-center gap-1 w-1/4 h-14"
        :class="{ active: $route.name === 'pet-favorites' }"
      >
        <font-awesome-icon icon="heart" />
        <span class="text-xs">Favorit</span>
      </RouterLink>
      <RouterLink
        to="/my"
        class="flex flex-col justify-center items-center gap-1 w-1/4 h-14"
        :class="{ active: $route.name === 'profile' }"
        v-if="isLoggedIn"
      >
        <font-awesome-icon icon="user" />
        <span class="text-xs">Profil</span>
      </RouterLink>
      <a
        href="#/login"
        class="flex flex-col justify-center items-center gap-1 w-1/4 h-14"
        v-else
      >
        <font-awesome-icon icon="user" />
        <span class="text-xs">Profil</span>
      </a>
      <div class="indicator" v-show="showIndicator()"></div>
    </nav>
    <component :is="currentView" />
  </div>
</template>

<style scoped>
nav a.active {
  color: var(--primary);
}

nav a.active span {
  color: var(--darkGray);
}

nav .indicator {
  width: calc(100% / 4);
  height: 4px;
  background-color: var(--primary);
  position: absolute;
  bottom: 0;
  left: 0;
  transition: 0.5s;
}

nav a:nth-child(1).active ~ .indicator {
  transform: translateX(calc(100% / 4 * 0));
}

nav a:nth-child(2).active ~ .indicator {
  transform: translateX(calc(100% / 4 * 4));
}

nav a:nth-child(3).active ~ .indicator {
  transform: translateX(calc(100% / 4 * 8));
}

nav a:nth-child(4).active ~ .indicator {
  transform: translateX(calc(100% / 4 * 12));
}
</style>
