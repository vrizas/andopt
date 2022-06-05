<script setup>
import { gsap } from 'gsap'
import { ref, onMounted } from 'vue'
import { getAuth, updatePassword } from 'firebase/auth'

const editPasswordPopup = ref(null)
const newPassword = ref('')
const confirmNewPassword = ref('')
const newPasswordEl = ref(null)
const confirmNewPasswordEl = ref(null)

const auth = getAuth()
const user = auth.currentUser

const closePopup = () => {
  window.location.hash = '/'
}

const changePasswordHandler = () => {
  if (!newPassword.value || !confirmNewPassword.value) {
    alert('Mohon isi semua field')
    return
  }

  if (newPassword.value !== confirmNewPassword.value) {
    newPasswordEl.value.style.borderColor = '#EF144A'
    gsap.from(newPasswordEl.value, { duration: 0.3, x: 10, ease: 'bounce' })
    confirmNewPasswordEl.value.style.borderColor = '#EF144A'
    gsap.from(confirmNewPasswordEl.value, { duration: 0.3, x: 10, ease: 'bounce' })
    return
  }

  updatePassword(user, newPassword.value).then(() => {
    closePopup()
  }).catch((error) => {
    alert(error.message)
  })
}

onMounted(() => {
  gsap.to(editPasswordPopup.value, { duration: 0.3, y: 0, ease: 'power2' })
})
</script>

<template>
  <section
      class="absolute top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
      ref="editPasswordPopupContainer"
    >
      <div
        class="w-full h-full bg-white translate-y-full py-4 px-5 absolute top-0 left-0 overflow-y-auto"
        ref="editPasswordPopup"
      >
        <button
          class="absolute right-5 text-2xl"
          @click="closePopup"
        >
          <font-awesome-icon icon="xmark" />
        </button>
        <h2 class="text-primary text-xl font-semibold my-5">Ubah Password</h2>
        <form class="flex flex-col gap-3 mt-10" @submit.prevent="changePasswordHandler">
          <div class="flex flex-col gap-1">
            <label for="newPassword">Password Baru</label>
            <input
              class="py-3 px-4 bg-white border-b-2 border-primary"
              type="password"
              v-model="newPassword"
              ref="newPasswordEl"
              id="newPassword"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="confirmNewPassword">Konfirmasi Password Baru</label>
            <input
              class="py-3 px-4 bg-white border-b-2 border-primary"
              type="password"
              v-model="confirmNewPassword"
              ref="confirmNewPasswordEl"
              id="confirmNewPassword"
            />
          </div>
          <div class="w-full text-center">
            <button
              class="bg-primary text-white px-4 py-2 w-1/3 rounded-md font-semibold mt-4"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </section>
</template>
