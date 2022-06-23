<script setup>
import {
  ref, computed
} from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'

import defaultProfilePic from '../../../assets/images/default-profile-pic.png'
import EditProfilePopupVue from '../../../components/mobile/popup/EditProfilePopup.vue'
import EditPasswordPopupVue from '../../../components/mobile/popup/EditPasswordPopup.vue'
import HeaderBar from '../../../components/mobile/HeaderBar.vue'

const router = useRouter()
const auth = getAuth()
const user = ref(null)
const isLoggedIn = ref(false)

onAuthStateChanged(auth, (account) => {
  if (account) {
    user.value = account
    isLoggedIn.value = true
  } else {
    user.value = null
    isLoggedIn.value = false
    window.location.href = '/#/login'
  }
})

const routes = {
  '/edit': EditProfilePopupVue,
  '/edit-password': EditPasswordPopupVue
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => routes[currentPath.value.slice(1) || '/'])

const signOutHandler = () => {
  signOut(auth).then(() => {
    router.push('/')
  }).catch((error) => {
    alert(error.message)
  })
}
</script>

<template>
  <div>
    <HeaderBar :isLoggedIn="isLoggedIn" />
    <main class="pt-6 pb-24 px-4">
      <section class="flex items-center gap-4 relative">
        <img :src="user?.photoURL || defaultProfilePic" alt="profil" class="w-20 h-20 rounded-full object-cover" draggable="false">
        <div class="truncate">
          <h2 class="text-lg font-semibold">{{ user?.displayName }}</h2>
          <p class="text-darkGray mt-1">{{ user?.email }}</p>
        </div>
        <a href="#/edit"
          class="text-xl text-darkGray absolute right-0 top-2"
        >
          <font-awesome-icon icon="pen-to-square" />
        </a>
      </section>
      <component :is="currentView" />
      <section class="mt-10">
        <h3 class="font-semibold">Dashboard</h3>
        <div class="flex flex-col gap-1 mt-5 ml-3 text-sm">
          <RouterLink to="/my/pet/add" class="flex items-center gap-3 py-2">
            <span
              class="flex justify-center items-center text-white w-8 h-8 bg-primary rounded-full"
            >
              <font-awesome-icon icon="plus" />
            </span>
            Unggah Peliharaan
          </RouterLink>
          <RouterLink to="/my/favorites" class="flex items-center gap-3 py-2">
            <span
              class="flex justify-center items-center text-white w-8 h-8 bg-pink rounded-full"
            >
              <font-awesome-icon icon="heart"/>
            </span>
            Favorit Saya
          </RouterLink>
          <RouterLink to="/my/lastseen" class="flex items-center gap-3 py-2">
            <span
              class="flex justify-center items-center text-white w-8 h-8 bg-darkGray rounded-full"
            >
              <font-awesome-icon icon="clock" />
            </span>
            Terakhir Dilihat
          </RouterLink>
          <RouterLink to="/my/upload" class="flex items-center gap-3 py-2">
            <span
              class="flex justify-center items-center text-white w-8 h-8 bg-secondary rounded-full"
            >
              <font-awesome-icon icon="paw" />
            </span>
            Unggahan Saya
          </RouterLink>
        </div>
      </section>
      <button class="text-pink border-2 border-pink rounded-md text-sm py-2 px-10 font-semibold mt-10 ml-3 focus:bg-pink focus:text-white active:bg-pink active:text-white" @click="signOutHandler">
        Keluar
      </button>
    </main>
  </div>
</template>

<style></style>
