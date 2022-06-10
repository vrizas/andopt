<script setup>
import {
  ref, onMounted, reactive, computed
} from 'vue'

import { RouterView } from 'vue-router'
import { gsap } from 'gsap'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HeaderBar from './components/desktop/HeaderBar.vue'
import FooterBar from './components/desktop/FooterBar.vue'
import EmailVerificationPopup from './components/desktop/popup/EmailVerificationPopup.vue'

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
  }
})

const openChat = ref(false)
const chatReceiverUid = ref('')
const chatPetId = ref('')

const openChatHandler = (uid, petId) => {
  chatReceiverUid.value = uid || ''
  chatPetId.value = petId || ''
  openChat.value = true
}

const closeChatHandler = () => {
  openChat.value = false
}

</script>

<template>
  <div>
    <HeaderBar :isLoggedIn="isLoggedIn" :openChat="openChat" :openChatHandler="openChatHandler" :closeChatHandler="closeChatHandler" :chatReceiverUid="chatReceiverUid" :chatPetId="chatPetId" />
    <RouterView :openChatHandler="openChatHandler" />
    <FooterBar :isLoggedIn="isLoggedIn" />
    <EmailVerificationPopup v-if="isEmailVerified === false" />
  </div>
</template>

<style>
.trashButton:hover .icon, .likeButton:hover .icon {
  color: #EF144A;
}
</style>
