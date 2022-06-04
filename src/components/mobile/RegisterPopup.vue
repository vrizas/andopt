<script setup>
import { gsap } from 'gsap'
import { ref, onMounted } from 'vue'

const registerPopup = ref(null)

onMounted(() => {
  gsap.to(registerPopup.value, { duration: 0.3, y: 0, ease: 'power2' })
})
</script>

<template>
  <section
    class="absolute top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="registerPopupContainer"
  >
    <div
      class="w-full h-full bg-white translate-y-full py-4 px-5 absolute top-0 left-0"
      ref="registerPopup"
    >
      <a href="#/" class="absolute right-5 text-3xl">
        <ion-icon name="close"></ion-icon>
      </a>
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
        <a href="#/login" class="text-primary"> Masuk sekarang </a>
      </p>
    </div>
  </section>
</template>
