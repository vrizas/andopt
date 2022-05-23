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
          @click="showLoginPopUpHandler"
        >
          <ion-icon name="person"></ion-icon>
          <span class="text-sm">Profile</span>
        </button>
        <div class="indicator"></div>
      </nav>
      <section
        class="absolute top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
        ref="loginPopupContainer"
        v-show="showLoginPopUp"
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
      >
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
