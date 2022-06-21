<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth'
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator'
import defaultProfilePic from '../../../../assets/images/default-profile-pic.png'
import { gsap } from 'gsap'
import axios from 'axios'
import CONFIG from '../../../../config'

const router = useRouter()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const passwordEl = ref(null)
const confirmPasswordEl = ref(null)
const auth = getAuth()

const generateSecurePassword = () => {
  const securePassword = Math.random().toString(36).slice(-10)
  password.value = securePassword
  confirmPassword.value = securePassword
}

const submitHandler = async (e) => {
  e.preventDefault()

  if (!email.value || !password.value || !confirmPassword.value) {
    alert('Mohon isi semua field')
  } else {
    if (password.value !== confirmPassword.value) {
      passwordEl.value.style.borderColor = '#EF144A'
      confirmPasswordEl.value.style.borderColor = '#EF144A'
      gsap.from(passwordEl.value, { duration: 0.3, x: 10, ease: 'bounce' })
      gsap.from(confirmPasswordEl.value, { duration: 0.3, x: 10, ease: 'bounce' })
      return
    }

    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const { user } = userCredential
        const randomName = uniqueNamesGenerator({
          dictionaries: [animals, colors],
          length: 2
        }).replace('_', '')

        axios.post(`${CONFIG.API_BASE_URL}/user/register`, {
          uid: user.uid,
          username: randomName,
          email: email.value,
          photoURL: defaultProfilePic
        })

        updateProfile(auth.currentUser, {
          displayName: randomName,
          photoURL: defaultProfilePic
        }).catch(() => {
          alert('Terjadi kesalahan')
        })
      }).then(() => {
        sendEmailVerification(auth.currentUser, {
          url: 'http://localhost:3000/'
        })
          .then(() => {
            router.push('/spv/admin/list')
          }).catch(() => {
            alert('Terjadi kesalahan')
          })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert(errorMessage)
      })
  }
}
</script>

<template>
    <form class="py-8 px-10" @submit.prevent="submitHandler">
        <h2 class="font-semibold text-lg mb-8">Buat Admin</h2>
        <div class="flex flex-col gap-3 text-sm w-1/2">
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
            <div class="relative flex flex-col gap-1">
                <label for="password">Password</label>
                <input
                    class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
                    type="text"
                    v-model="password"
                    ref="passwordEl"
                    id="password"
                    required
                />
                <button class="absolute right-[-40px] bottom-0 text-xl" @click.prevent="generateSecurePassword">
                    <font-awesome-icon icon="shuffle" />
                </button>
            </div>
            <div class="flex flex-col gap-1">
                <label for="confirmPassword">Konfirmasi Password</label>
                <input
                    class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
                    type="text"
                    v-model="confirmPassword"
                    ref="confirmPasswordEl"
                    id="confirmPassword"
                    required
                />
            </div>
            <button class="bg-primary text-white px-10 py-3 w-fit rounded-md font-semibold mt-12">
                Daftarkan
            </button>
        </div>
    </form>
</template>
