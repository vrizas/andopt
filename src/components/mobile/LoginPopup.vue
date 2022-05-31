<script setup>
import { gsap } from "gsap";
import { ref, onMounted } from "vue";

const loginPopup = ref(null);

onMounted(() => {
  gsap.to(loginPopup.value, { duration: 0.3, y: 0, ease: "power2" });
});
</script>

<template>
  <section
    class="absolute top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="loginPopupContainer"
  >
    <div
      class="w-full h-full bg-white translate-y-full py-4 px-5 absolute top-0 left-0"
      ref="loginPopup"
    >
      <a href="#/" class="absolute right-5 text-3xl">
        <ion-icon name="close"></ion-icon>
      </a>
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
        <a href="#/register" class="text-primary"> Daftar sekarang </a>
      </p>
    </div>
  </section>
</template>
