<script setup>
import {
  ref, onMounted, reactive, computed
} from 'vue'
import axios from 'axios'
import { RouterView, useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import UserHeaderBar from './components/desktop/user/HeaderBar.vue'
import SpvHeaderBar from './components/desktop/spv/HeaderBar.vue'
import AdminHeaderBar from './components/desktop/admin/HeaderBar.vue'
import FooterBar from './components/desktop/user/FooterBar.vue'
import EmailVerificationPopup from './components/desktop/user/popup/EmailVerificationPopup.vue'
import CONFIG from './config'

const route = useRoute()
const isLoggedIn = ref(false)
const isEmailVerified = ref(null)
const auth = getAuth()
const userRole = ref('')

onAuthStateChanged(auth, (user) => {
  if (user) {
    const { emailVerified } = user
    isLoggedIn.value = true
    isEmailVerified.value = emailVerified
    axios.get(`${CONFIG.API_BASE_URL}/user/${user.uid}`).then(res => {
      userRole.value = res.data.user.role
    })
  } else {
    isLoggedIn.value = false
    isEmailVerified.value = null
  }
})

const openChat = ref(false)
const chatReceiverUid = ref('')
const chatPetId = ref('')

const openChatHandler = (uid, petId) => {
  if (!isLoggedIn.value) {
    window.location.hash = '/login'
  }
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
    <UserHeaderBar :isLoggedIn="isLoggedIn" :openChat="openChat" :openChatHandler="openChatHandler" :closeChatHandler="closeChatHandler" :chatReceiverUid="chatReceiverUid" :chatPetId="chatPetId" v-if="route.name!=='spv-panel'&&route.name!=='admin-panel'" />
    <SpvHeaderBar v-else-if="route.name==='spv-panel'&&userRole==='spv'" />
    <AdminHeaderBar v-else-if="route.name==='admin-panel'&&userRole==='admin'" />
    <RouterView :openChatHandler="openChatHandler" />
    <FooterBar :isLoggedIn="isLoggedIn" v-if="route.name!=='spv-panel'&&route.name!=='admin-panel'" />
    <EmailVerificationPopup v-if="isEmailVerified === false" />
  </div>
</template>

<style>
.trashButton:hover .icon, .likeButton:hover .icon {
  color: #EF144A;
}
</style>
