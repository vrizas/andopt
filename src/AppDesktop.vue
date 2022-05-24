<script setup>
import { ref, onMounted } from "vue";
import { reactive, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { gsap } from "gsap";

const loginPopup = ref(null);
const registerPopup = ref(null);

function showLoginPopUpHandler() {
  gsap.to(registerPopup.value, { duration: 0.3, y: "100%", ease: "power2" });
  setTimeout(() => {
    currentHashLink.hash = "#login";
    gsap.to(loginPopup.value, { duration: 0.3, y: "-50%", ease: "power2" });
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
    gsap.to(registerPopup.value, { duration: 0.3, y: "-50%", ease: "power2" });
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
  <header
    class="bg-primary flex justify-between sticky top-0 left-0 align-center py-4 px-5"
  >
    <h1>Andopt</h1>
    <nav class="flex gap-5 text-sm">
      <button
        class="border-2 rounded-md bg-white text-primary py-1 px-5 font-semibold"
        @click="showLoginPopUpHandler"
      >
        Masuk
      </button>
      <button
        class="border-2 rounded-md bg-primary text-white py-1 px-5 font-semibold"
        @click="showRegisterPopUpHandler"
      >
        Daftar
      </button>
    </nav>
  </header>
  <section
    class="absolute top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="loginPopupContainer"
    v-show="showLoginPopUp"
    @click="closeLoginPopUp"
  >
    <div
      class="bg-white py-8 px-10 rounded-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-full w-3/4"
      ref="loginPopup"
      @click="(e) => e.stopPropagation()"
    >
      <h2 class="text-primary text-2xl font-semibold my-5">Masuk</h2>
      <form class="flex flex-col gap-3">
        <div class="flex flex-col gap-1">
          <label for="useremail">Username / Email</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary"
            type="text"
            id="useremail"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="login-password">Password</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary"
            type="password"
            id="login-password"
          />
        </div>
        <div class="w-full text-right my-3">
          <button>Lupa password ?</button>
        </div>
        <div class="w-full text-center">
          <button
            class="bg-primary text-white px-4 py-3 w-1/3 rounded-md font-semibold"
          >
            Masuk
          </button>
        </div>
      </form>
      <p class="mt-8 text-center">
        Belum punya akun ?
        <button class="text-primary" @click="showRegisterPopUpHandler">
          Daftar sekarang
        </button>
      </p>
    </div>
  </section>
  <section
    class="absolute top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="registerPopupContainer"
    v-show="showRegisterPopUp"
    @click="closeRegisterPopUp"
  >
    <div
      class="bg-white py-8 px-10 rounded-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-full w-3/4"
      ref="registerPopup"
      @click="(e) => e.stopPropagation()"
    >
      <h2 class="text-primary text-2xl font-semibold my-5">Daftar</h2>
      <form class="flex flex-col gap-3">
        <div class="flex flex-col gap-1">
          <label for="username">Username</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary"
            type="text"
            id="username"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="email">Email</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary"
            type="email"
            id="email"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="register-password">Password</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary"
            type="password"
            id="register-password"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="confirm-password">Konfirmasi Password</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary"
            type="password"
            id="confirm-password"
          />
        </div>
        <div class="w-full text-center">
          <button
            class="bg-primary text-white px-4 py-3 w-1/3 rounded-md font-semibold mt-12"
          >
            Daftar
          </button>
        </div>
      </form>
      <p class="mt-8 text-center">
        Sudah punya akun ?
        <button class="text-primary" @click="showLoginPopUpHandler">
          Masuk sekarang
        </button>
      </p>
    </div>
  </section>
</template>

<style scoped></style>
