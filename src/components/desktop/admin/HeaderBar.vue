<script setup>
import DropdownProfile from '../user/DropdownProfile.vue'
</script>

<template>
  <div class="sticky top-0 z-[999]">
    <header class="bg-secondary flex justify-between align-center py-3 px-10">
      <h1 class="relative text-white text-xs font-semibold font-montserrat">
        <RouterLink to="/">
          <img src="../../../assets/logo-white-without-text.svg" width="50" alt="Andopt Logo">
          <span class="absolute bottom-[-5px] right-[-20px]">Andopt</span>
        </RouterLink>
      </h1>
      <nav class="flex gap-8 items-center text-xs">
        <DropdownProfile />
      </nav>
    </header>
  </div>
</template>

<style scoped></style>
