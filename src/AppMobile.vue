<script setup>
import { ref, onMounted } from "vue";
import { reactive, computed } from "vue";
import { RouterView } from "vue-router";
import { gsap } from "gsap";
import NavigationBar from "./components/mobile/NavigationBar.vue";

const loginPopup = ref(null);
const registerPopup = ref(null);

function showLoginPopUpHandler() {
  gsap.to(registerPopup.value, { duration: 0.3, y: "100%", ease: "power2" });
  setTimeout(() => {
    currentHashLink.hash = "#login";
    gsap.to(loginPopup.value, { duration: 0.3, y: 0, ease: "power2" });
  }, 300);

  history.replaceState(undefined, undefined, "#login");
}

function closeLoginPopUp() {
  gsap.to(loginPopup.value, { duration: 0.3, y: "100%", ease: "power2" });
  setTimeout(() => {
    currentHashLink.hash = "#";
    history.replaceState(undefined, undefined, "#");
  }, 300);
}

function showRegisterPopUpHandler() {
  gsap.to(loginPopup.value, { duration: 0.3, y: "100%", ease: "power2" });
  setTimeout(() => {
    currentHashLink.hash = "#register";
    gsap.to(registerPopup.value, { duration: 0.3, y: 0, ease: "power2" });
  }, 300);

  history.replaceState(undefined, undefined, "#register");
}

function closeRegisterPopUp() {
  gsap.to(registerPopup.value, { duration: 0.3, y: "100%", ease: "power2" });
  setTimeout(() => {
    currentHashLink.hash = "#";
    history.replaceState(undefined, undefined, "#");
  }, 300);
}

const currentHashLink = reactive({
  hash: "#",
});

const showLoginPopUp = computed(() => {
  return currentHashLink.hash === "#login";
});

const showRegisterPopUp = computed(() => {
  return currentHashLink.hash === "#register";
});

onMounted(() => {
  currentHashLink.hash = window.location.hash || "#";

  if (currentHashLink.hash === "#login") {
    showLoginPopUpHandler();
  } else if (currentHashLink.hash === "#register") {
    showRegisterPopUpHandler();
  }
});
</script>

<template>
  <div class="bg-lightGray">
    <div class="mobile-container">
      <NavigationBar />
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.mobile-container {
  background-color: var(--white);
  position: relative;
  max-width: 600px;
  min-width: 320px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>
