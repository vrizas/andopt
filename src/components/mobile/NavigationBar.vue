<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import LoginPopupVue from './LoginPopup.vue';
import RegisterPopUpVue from './RegisterPopup.vue';

const routes = {
  '/login': LoginPopupVue,
  '/register': RegisterPopUpVue,
};

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => routes[currentPath.value.slice(1) || '/']);
</script>

<template>
  <div>
    <nav
      class="flex justify-between w-full fixed bottom-0 left-0 right-0 bg-white text-2xl shadow-andopt text-darkGray max-w-[600px] m-auto"
    >
      <RouterLink
        to="/"
        class="flex flex-col justify-center items-center gap-1 w-1/4 h-16"
        :class="{ active: $route.name === 'home' }"
      >
        <ion-icon name="home"></ion-icon>
        <span class="text-sm">Beranda</span>
      </RouterLink>
      <RouterLink
        to="/post"
        class="flex flex-col justify-center items-center gap-1 w-1/4 h-16"
        :class="{ active: $route.name === 'post' }"
      >
        <ion-icon name="add-circle"></ion-icon>
        <span class="text-sm">Unggah</span>
      </RouterLink>
      <RouterLink
        to="/favorite"
        class="flex flex-col justify-center items-center gap-1 w-1/4 h-16"
        :class="{ active: $route.name === 'favorite' }"
      >
        <ion-icon name="heart"></ion-icon>
        <span class="text-sm">Favorit</span>
      </RouterLink>
      <a
        href="#/login"
        class="flex flex-col justify-center items-center gap-1 w-1/4 h-16"
      >
        <ion-icon name="person"></ion-icon>
        <span class="text-sm">Profile</span>
      </a>
      <div class="indicator"></div>
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
