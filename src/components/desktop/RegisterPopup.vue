<script setup>
import { gsap } from 'gsap';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const registerPopup = ref(null);
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordEl = ref(null);
const confirmPasswordEl = ref(null);
const router = useRouter();
const auth = getAuth();

const closePopup = () => {
  window.location.hash = '/';
};

const submitHandler = async (e) => {
  e.preventDefault();

  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    alert('Mohon isi semua field');
  } else {
    if (password.value !== confirmPassword.value) {
      passwordEl.value.style.borderColor = '#EF144A';
      confirmPasswordEl.value.style.borderColor = '#EF144A';
      gsap.from(passwordEl.value, { duration: 0.3, x: 10, ease: 'bounce' });
      gsap.from(confirmPasswordEl.value, { duration: 0.3, x: 10, ease: 'bounce' });
    }

    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const { user } = userCredential;
        updateProfile(auth.currentUser, {
          displayName: username.value,
        }).then(() => {
          // Profile updated!
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });
        closePopup();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
};

onMounted(() => {
  gsap.to(registerPopup.value, { duration: 0.3, scale: 1, ease: 'power2' });
});
</script>

<template>
  <section
    class="fixed top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="registerPopupContainer"
    @click="closePopup"
  >
    <div
      class="bg-white py-8 px-10 rounded-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] scale-0 w-1/2 h-5/6 overflow-y-scroll"
      ref="registerPopup"
      @click="(e) => e.stopPropagation()"
    >
      <h2 class="text-primary text-xl font-semibold my-5">Daftar</h2>
      <form class="flex flex-col gap-3 text-sm" @submit.prevent="submitHandler">
        <div class="flex flex-col gap-1">
          <label for="username">Username</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            v-model="username"
            id="username"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="email">Email</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="email"
            v-model="email"
            id="email"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="password">Password</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="password"
            v-model="password"
            ref="passwordEl"
            id="password"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="confirmPassword">Konfirmasi Password</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="password"
            v-model="confirmPassword"
            ref="confirmPasswordEl"
            id="confirmPassword"
            required
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
