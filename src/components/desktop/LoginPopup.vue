<script setup>
import { gsap } from 'gsap';
import { ref, onMounted } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const email = ref('');
const password = ref('');
const passwordEl = ref(null);
const loginPopup = ref(null);
const auth = getAuth();

const closePopup = () => {
  window.location.hash = '/';
};

const submitHandler = async (e) => {
  e.preventDefault();

  if (!email.value || !password.value) {
    alert('Mohon isi semua field');
  } else {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const { user } = userCredential;
        closePopup();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/user-not-found') {
          alert('User not found');
        } else if (errorCode === 'auth/wrong-password') {
          passwordEl.value.style.borderColor = '#EF144A';
          gsap.from(passwordEl.value, { duration: 0.3, x: 10, ease: 'bounce' });
        } else {
          alert(errorMessage);
        }
      });
  }
};

onMounted(() => {
  gsap.to(loginPopup.value, { duration: 0.3, scale: 1, ease: 'power2' });
});
</script>

<template>
  <section
    class="fixed top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="loginPopupContainer"
    @click="closePopup"
  >
    <div
      class="bg-white py-8 px-10 rounded-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] scale-0 w-1/2"
      ref="loginPopup"
      @click="(e) => e.stopPropagation()"
    >
      <h2 class="text-primary text-xl font-semibold my-5">Masuk</h2>
      <form class="flex flex-col gap-3 text-sm" @submit.prevent="submitHandler">
        <div class="flex flex-col gap-1">
          <label for="email">Email</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
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
