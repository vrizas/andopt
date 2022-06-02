<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import LoginPopupVue from './LoginPopup.vue';
import RegisterPopupVue from './RegisterPopup.vue';
import DropdownProfile from './DropdownProfile.vue';

defineProps({
  username: String,
  isLoggedIn: Boolean,
});

const routes = {
  '/login': LoginPopupVue,
  '/register': RegisterPopupVue,
};

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => routes[currentPath.value.slice(1) || '/']);
</script>

<template>
  <div class="sticky top-0 z-[999]">
    <header class="bg-primary flex justify-between align-center py-3 px-10" v-if="isLoggedIn">
      <h1 class="relative text-white text-xs font-semibold font-montserrat">
        <a href="/">
          <img src="../../assets/logo-white-without-text.svg" width="50" alt="Andopt Logo">
          <span class="absolute bottom-[-5px] right-[-20px]">Andopt</span>
        </a>
      </h1>
      <nav class="flex gap-8 items-center text-xs">
        <RouterLink to="/" class="text-xl text-white">
          <font-awesome-icon icon="bell" />
        </RouterLink>
        <RouterLink to="/" class="text-xl text-white">
          <font-awesome-icon icon="comment-dots" />
        </RouterLink>
        <DropdownProfile :username="username" />
      </nav>
    </header>
    <header
      class="bg-primary flex justify-between sticky top-0 left-0 align-center py-3 px-10"
      v-else
    >
      <h1 class="relative text-white text-xs font-semibold font-montserrat">
        <a href="/">
          <img src="../../assets/logo-white-without-text.svg" width="50" alt="Andopt Logo">
          <span class="absolute bottom-[-5px] right-[-20px]">Andopt</span>
        </a>
      </h1>
      <nav class="flex gap-5 items-center text-sm">
        <a
          href="#/login"
          class="rounded-md bg-white text-primary py-1 px-5 font-semibold"
        >
          Masuk
        </a>
        <a
          href="#/register"
          class="border rounded-md bg-primary text-white py-1 px-5 font-semibold hover:bg-white hover:text-primary focus:bg-white focus:text-primary"
        >
          Daftar
        </a>
      </nav>
    </header>
    <component :is="currentView" />
  </div>
</template>

<style scoped></style>
