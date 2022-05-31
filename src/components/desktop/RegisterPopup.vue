<script setup>
import { gsap } from "gsap";
import { ref, onMounted } from "vue";

const registerPopup = ref(null);

const closePopup = () => {
  window.location.hash = '/'
};

onMounted(() => {
  gsap.to(registerPopup.value, { duration: 0.3, scale: 1, ease: "power2" });
});
</script>

<template>
  <section
    class="absolute top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="registerPopupContainer"
    @click="closePopup"
  >
    <div
      class="bg-white py-8 px-10 rounded-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] scale-0 w-1/2 h-5/6 overflow-y-scroll"
      ref="registerPopup"
      @click="(e) => e.stopPropagation()"
    >
      <h2 class="text-primary text-xl font-semibold my-5">Daftar</h2>
      <form class="flex flex-col gap-3 text-sm">
        <div class="flex flex-col gap-1">
          <label for="username">Username</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            id="username"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="email">Email</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="email"
            id="email"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="register-password">Password</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="password"
            id="register-password"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="confirm-password">Konfirmasi Password</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
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
      <p class="mt-8 text-center text-sm">
        Sudah punya akun ?
        <a href="#/login" class="text-primary"> Masuk sekarang </a>
      </p>
    </div>
  </section>
</template>

<style scoped></style>
