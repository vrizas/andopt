<script setup>
import { gsap } from 'gsap'
import { ref, onMounted } from 'vue'
import { getAuth, signOut, sendEmailVerification } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const emailVerificationPopup = ref(null)
const auth = getAuth()

const sendEmailVerificationHandler = async (e) => {
  e.preventDefault()
  sendEmailVerification(auth.currentUser, {
    url: 'https://andopt.vercel.app/'
  })
    .then(() => {
      alert('Email verifikasi telah dikirim')
    }).catch(() => {
      alert('Terjadi kesalahan')
    })
}

const signOutHandler = () => {
  signOut(auth).then(() => {
    router.push('/')
  }).catch((error) => {
    alert(error.message)
  })
}

onMounted(() => {
  gsap.to(emailVerificationPopup.value, { duration: 0.3, scale: 1, ease: 'power2' })
})
</script>

<template>
  <section
    class="fixed top-0 left-0 z-[999] w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="emailVerificationPopupContainer"
  >
    <div
      class="bg-white py-8 px-20 rounded-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] scale-0 w-1/2 overflow-y-auto text-center"
      ref="emailVerificationPopup"
    >
      <p class="text-secondary font-semibold my-5">Email verifikasi telah terkirim, silahkan verifikasi email kamu!</p>
      <button class="w-full border border-darkGray rounded py-3 text-sm" @click="sendEmailVerificationHandler">Tekan ini jika belum mendapatkan verifikasi email</button>
      <p class="text-darkGray text-xs my-3">Atau</p>
      <div class="flex justify-center">
        <button class="flex gap-2 items-center py-2 px-6 bg-pink text-white rounded text-sm" @click="signOutHandler">
            <font-awesome-icon icon="right-from-bracket" />
            Keluar
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
