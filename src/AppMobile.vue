<script setup>
import {
  ref, onMounted, reactive, computed
} from 'vue'

import { RouterView } from 'vue-router'
import { gsap } from 'gsap'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import NavigationBar from './components/mobile/NavigationBar.vue'
import EmailVerificationPopup from './components/mobile/popup/EmailVerificationPopup.vue'

const isLoggedIn = ref(false)
const isEmailVerified = ref(null)

const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  if (user) {
    const { emailVerified } = user
    isLoggedIn.value = true
    isEmailVerified.value = emailVerified
  } else {
    isLoggedIn.value = false
    isEmailVerified.value = null
  }
})

const openChat = ref(false)
const showChatRoom = ref(false)
const chatReceiverUid = ref('')
const chatPetId = ref('')

const openChatHandler = (uid, petId, openChatRoom) => {
  if (!isLoggedIn.value) {
    window.location.hash = '/login'
  }
  chatReceiverUid.value = uid || ''
  chatPetId.value = petId || ''
  showChatRoom.value = openChatRoom || false
  openChat.value = true
}

const closeChatHandler = () => {
  openChat.value = false
}
</script>

<template>
  <div class="bg-lightGray">
    <div class="mobile-container">
      <NavigationBar :isLoggedIn="isLoggedIn" />
      <RouterView :openChat="openChat" :openChatHandler="openChatHandler" :closeChatHandler="closeChatHandler" :chatReceiverUid="chatReceiverUid" :chatPetId="chatPetId" :showChatRoom="showChatRoom" />
      <EmailVerificationPopup v-if="isEmailVerified === false" />
    </div>
  </div>
</template>

<style scoped>
.mobile-container {
  background-color: var(--white);
  position: relative;
  max-width: 600px;
  min-width: 320px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>
