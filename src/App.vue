<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { gsap } from "gsap";

const authPopupContainer = ref(null);
const loginPopup = ref(null);
const registerPopup = ref(null);

function showLoginPopUp() {
  authPopupContainer.value.classList.remove("hidden");
  gsap.to(registerPopup.value, { duration: 0.3, y: "100%", ease: "power2" });
  gsap.to(loginPopup.value, { duration: 0.3, y: 0, ease: "power2" });
}

function closeLoginPopUp() {
  gsap.to(loginPopup.value, { duration: 0.3, y: "100%", ease: "power2" });
  setTimeout(() => {
    authPopupContainer.value.classList.add("hidden");
  }, 300);
}

function showRegisterPopUp() {
  authPopupContainer.value.classList.remove("hidden");
  gsap.to(loginPopup.value, { duration: 0.3, y: "100%", ease: "power2" });
  gsap.to(registerPopup.value, { duration: 0.3, y: 0, ease: "power2" });
}

function closeRegisterPopUp() {
  gsap.to(registerPopup.value, { duration: 0.3, y: "100%", ease: "power2" });
  setTimeout(() => {
    authPopupContainer.value.classList.add("hidden");
  }, 300);
}
</script>

<template>
  <nav
    class="flex justify-between w-full fixed bottom-0 left-0 right-0 bg-white text-2xl shadow shadow-black text-darkGray max-w-[600px] m-auto"
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
    <button
      class="flex flex-col justify-center items-center gap-1 w-1/4 h-16"
      @click="showLoginPopUp"
    >
      <ion-icon name="person"></ion-icon>
      <span class="text-sm">Profile</span>
    </button>
    <div class="indicator"></div>
  </nav>
  <section
    class="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,.5)] hidden overflow-hidden"
    ref="authPopupContainer"
  >
    <div
      class="w-full h-full bg-white translate-y-full py-4 px-5 absolute top-0 left-0"
      ref="loginPopup"
    >
      <button class="absolute right-5 text-3xl" @click="closeLoginPopUp">
        <ion-icon name="close"></ion-icon>
      </button>
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
          <label for="password">Password</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary"
            type="password"
            id="password"
          />
        </div>
        <div class="w-full text-right my-3">
          <button>Lupa password ?</button>
        </div>
        <div class="w-full text-center">
          <button
            class="bg-primary text-white px-4 py-3 w-1/3 rounded text-md font-semibold"
          >
            Masuk
          </button>
        </div>
      </form>
      <p class="mt-8 text-center">
        Belum punya akun ?
        <button class="text-primary" @click="showRegisterPopUp">
          Daftar sekarang
        </button>
      </p>
    </div>
    <div
      class="w-full h-full bg-white translate-y-full py-4 px-5 absolute top-0 left-0"
      ref="registerPopup"
    >
      <button class="absolute right-5 text-3xl" @click="closeRegisterPopUp">
        <ion-icon name="close"></ion-icon>
      </button>
      <h2 class="text-primary text-2xl font-semibold my-5">Daftar</h2>
      <form class="flex flex-col gap-3">
        <div class="flex flex-col gap-1">
          <label for="user">Username</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary"
            type="text"
            id="user"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="email">Email</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary"
            type="text"
            id="email"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="password">Password</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary"
            type="password"
            id="password"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="konfirmpassword">Konfirmasi Password</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary"
            type="password"
            id="konfirmpassword"
          />
        </div>
        <div class="w-full text-center">
          <button
            class="bg-primary text-white px-4 py-3 w-1/3 rounded text-md font-semibold mt-12"
          >
            Daftar
          </button>
        </div>
      </form>
      <p class="mt-8 text-center">
        Sudah punya akun ?
        <button class="text-primary" @click="showLoginPopUp">
          Masuk sekarang
        </button>
      </p>
    </div>
  </section>
  <!-- <RouterView /> -->
</template>

<style>
body {
  background-color: var(--lightGray);
}

#app {
  background-color: var(--white);
  position: relative;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
}

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
