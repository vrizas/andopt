<script setup>
import { gsap } from 'gsap'
import { ref, onMounted } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const passwordEl = ref(null)
const loginPopup = ref(null)
const closeBtn = ref(null)
const auth = getAuth()

onMounted(() => {
  gsap.to(loginPopup.value, { duration: 0.3, y: 0, ease: 'power2' })
})

const submitHandler = async (e) => {
  e.preventDefault()

  if (!email.value || !password.value) {
    alert('Mohon isi semua field')
  } else {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const { user } = userCredential
        closeBtn.value.click()
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        if (errorCode === 'auth/user-not-found') {
          alert('User not found')
        } else if (errorCode === 'auth/wrong-password') {
          passwordEl.value.style.borderColor = '#EF144A'
          gsap.from(passwordEl.value, { duration: 0.3, x: 10, ease: 'bounce' })
        } else {
          alert(errorMessage)
        }
      })
  }
}
</script>

<template>
  <section
    class="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[99] w-full h-full max-w-[600px] bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="loginPopupContainer"
  >
    <div
      class="w-full h-full bg-white translate-y-full py-4 px-5 absolute top-0 left-0 overflow-y-auto"
      ref="loginPopup"
    >
      <a href="#/" ref="closeBtn" class="absolute right-5 text-2xl">
        <font-awesome-icon icon="xmark" />
      </a>
      <h2 class="text-primary text-xl font-semibold my-5">Masuk</h2>
      <form class="flex flex-col gap-3" @submit.prevent="submitHandler">
        <div class="flex flex-col gap-1">
          <label for="email">Email</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary"
            type="email"
            v-model="email"
            id="email"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="login-password">Password</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary"
            type="password"
            v-model="password"
            ref="passwordEl"
            id="login-password"
            required
          />
        </div>
        <div class="w-full text-right my-3">
           <a href="#/reset-password">Lupa password ?</a>
        </div>
        <div class="w-full text-center">
          <button
            class="bg-primary text-white px-4 py-2 w-1/3 rounded-md font-semibold"
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
