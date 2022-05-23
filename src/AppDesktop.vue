<script setup>
import { ref, onMounted } from "vue";
import { reactive, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { gsap } from "gsap";
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/contact">Contact</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped></style>
