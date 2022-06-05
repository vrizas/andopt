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

const loginPopup = ref(null)
const registerPopup = ref(null)
const isLoggedIn = ref(false)
const isEmailVerified = ref(null)
const username = ref('')
const email = ref('')
const profilePicUrl = ref('')
const currentHashLink = reactive({
  hash: '#'
})

const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  if (user) {
    const { emailVerified } = user
    isLoggedIn.value = true
    isEmailVerified.value = emailVerified
    username.value = user.displayName
    email.value = user.email
    profilePicUrl.value = user.photoURL
  } else {
    isLoggedIn.value = false
  }
})

function showLoginPopUpHandler () {
  gsap.to(registerPopup.value, { duration: 0.3, y: '100%', ease: 'power2' })
  setTimeout(() => {
    currentHashLink.hash = '#login'
    gsap.to(loginPopup.value, { duration: 0.3, y: '-50%', ease: 'power2' })
  }, 300)

  history.replaceState(undefined, undefined, '#login')
}

function closeLoginPopUp () {
  gsap.to(loginPopup.value, { duration: 0.3, y: '100%', ease: 'power2' })
  setTimeout(() => {
    currentHashLink.hash = '#'
    history.replaceState(undefined, undefined, '#')
  }, 300)
}

function showRegisterPopUpHandler () {
  gsap.to(loginPopup.value, { duration: 0.3, y: '100%', ease: 'power2' })
  setTimeout(() => {
    currentHashLink.hash = '#register'
    gsap.to(registerPopup.value, { duration: 0.3, y: '-50%', ease: 'power2' })
  }, 300)

  history.replaceState(undefined, undefined, '#register')
}

function closeRegisterPopUp () {
  gsap.to(registerPopup.value, { duration: 0.3, y: '100%', ease: 'power2' })
  setTimeout(() => {
    currentHashLink.hash = '#'
    history.replaceState(undefined, undefined, '#')
  }, 300)
}

const showLoginPopUp = computed(() => currentHashLink.hash === '#login')

const showRegisterPopUp = computed(() => currentHashLink.hash === '#register')

onMounted(() => {
  currentHashLink.hash = window.location.hash || '#'

  if (currentHashLink.hash === '#login') {
    showLoginPopUpHandler()
  } else if (currentHashLink.hash === '#register') {
    showRegisterPopUpHandler()
  }
})
</script>

<template>
  <div>
    <HeaderBar :isLoggedIn="isLoggedIn" />
    <RouterView :username="username" :email="email" :profilePicUrl="profilePicUrl" />
    <FooterBar :isLoggedIn="isLoggedIn" />
    <EmailVerificationPopup v-if="isEmailVerified === false" />
  </div>
</template>

<style scoped></style>
