<script setup>
import { gsap } from "gsap";
import { ref, onMounted } from "vue";
const loginPopup = ref(null);

const closePopup = () => {
  window.location.hash = '/'
};

onMounted(() => {
  gsap.to(loginPopup.value, { duration: 0.3, scale: 1, ease: "power2" });
});
</script>

<template>
  <section
    class="absolute top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="loginPopupContainer"
    @click="closePopup"
  >
    <div
      class="bg-white py-8 px-10 rounded-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] scale-0 w-1/2"
      ref="loginPopup"
      @click="(e) => e.stopPropagation()"
    >
      <h2 class="text-primary text-xl font-semibold my-5">Masuk</h2>
      <form class="flex flex-col gap-3 text-sm">
        <div class="flex flex-col gap-1">
          <label for="useremail">Username / Email</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            id="useremail"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="login-password">Password</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="password"
            id="login-password"
          />
        </div>
        <div class="w-full text-right my-3">
          <button>Lupa password ?</button>
        </div>
        <div class="w-full text-center">
          <button
            class="bg-primary text-white px-3 py-2 w-1/3 rounded-md font-semibold"
          >
            Masuk
          </button>
        </div>
      </form>
      <p class="mt-8 text-center text-sm">
        Belum punya akun ?
        <a href="#/register" class="text-primary"> Daftar sekarang </a>
      </p>
    </div>
  </section>
</template>

<style scoped></style>
