<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="flex justify-between w-screen fixed bottom-0 left-0 bg-white shadow-xl text-lg">
    <RouterLink to="/" class="flex flex-col justify-center items-center px-3 py-2">
      <ion-icon name="home"></ion-icon>
      Home
    </RouterLink>
    <RouterLink to="/post" class="flex flex-col justify-center items-center px-3 py-2">
      <ion-icon name="add-circle-outline"></ion-icon>
      Unggah
    </RouterLink>
    <RouterLink to="/favorite" class="flex flex-col justify-center items-center px-3 py-2">
      <ion-icon name="heart-outline"></ion-icon>
      Favorit
    </RouterLink>
    <RouterLink to="/profile" class="flex flex-col justify-center items-center px-3 py-2">
      <ion-icon name="heart-outline"></ion-icon>
      Profile
    </RouterLink>
  </nav>
  <!-- <RouterView /> -->
</template>