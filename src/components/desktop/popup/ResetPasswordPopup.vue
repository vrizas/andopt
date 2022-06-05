<script setup>
import { gsap } from 'gsap'
import { ref, onMounted } from 'vue'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const resetPasswordPopup = ref(null)
const email = ref('')
const auth = getAuth()

const closePopup = () => {
  window.location.hash = '/'
}

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
  gsap.to(resetPasswordPopup.value, { duration: 0.3, scale: 1, ease: 'power2' })
})
</script>

<template>
  <section
    class="fixed top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="resetPasswordPopupContainer"
    @click="closePopup"
  >
    <div
      class="bg-white py-8 px-10 rounded-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] scale-0 w-1/2 overflow-y-auto"
      ref="resetPasswordPopup"
      @click="(e) => e.stopPropagation()"
    >
      <h2 class="text-primary text-xl font-semibold my-5">Setel Ulang Password</h2>
      <form class="flex flex-col gap-3 text-sm" @submit.prevent="resetPasswordHandler">
        <input class="py-3 px-4 bg-white border-b-2 border-primary text-sm" type="email" v-model="email" id="email" placeholder="Masukkan email" required/>
        <div class="w-full text-center">
          <button class="bg-primary text-white px-8 py-2 mt-6 rounded-md font-semibold text-sm">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
