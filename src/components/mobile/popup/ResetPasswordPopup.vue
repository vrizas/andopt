<script setup>
import { gsap } from 'gsap'
import { ref, onMounted } from 'vue'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const resetPasswordPopup = ref(null)
const email = ref('')
const auth = getAuth()

const resetPasswordHandler = async (e) => {
  e.preventDefault()

  sendPasswordResetEmail(auth, email.value, {
    url: 'http://localhost:3000/'
  })
    .then(() => {
      alert('Email reset password telah dikirim')
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      alert(errorMessage)
    })
}

onMounted(() => {
  gsap.to(resetPasswordPopup.value, { duration: 0.3, y: 0, ease: 'power2' })
})
</script>

<template>
  <section
    class="absolute top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="resetPasswordPopupContainer"
  >
    <div
      class="w-full h-full bg-white translate-y-full py-4 px-5 absolute top-0 left-0 overflow-y-auto"
      ref="resetPasswordPopup"
    >
      <a href="#/" ref="closeBtn" class="absolute right-5 text-2xl">
        <font-awesome-icon icon="xmark" />
      </a>
      <h2 class="text-primary text-2xl font-semibold my-5">Setel Ulang Password</h2>
      <form class="flex flex-col gap-3" @submit.prevent="resetPasswordHandler">
        <input class="py-3 px-4 bg-white border-b-2 border-primary" type="email" v-model="email" id="email" placeholder="Masukkan email" required/>
        <div class="w-full text-center">
          <button class="bg-primary text-white px-8 py-2 mt-6 rounded-md font-semibold">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
