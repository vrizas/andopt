<script setup>
import {
  ref, onMounted, reactive, computed
} from 'vue'
import gsap from 'gsap'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import defaultProfilePic from '../../assets/images/default-profile-pic.png'
import EditProfilePopupVue from '../../components/mobile/popup/EditProfilePopup.vue'
import EditPasswordPopupVue from '../../components/mobile/popup/EditPasswordPopup.vue'

defineProps({
  username: String,
  email: String,
  profilePicUrl: String
})

const router = useRouter()
const auth = getAuth()

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
  <main class="py-8 px-4">
    <section class="flex items-center gap-4 relative">
      <img :src="profilePicUrl || defaultProfilePic" alt="profil" class="w-24 h-24 rounded-full object-cover" draggable="false">
      <div class="truncate">
        <h2 class="text-xl font-semibold">{{ username }}</h2>
        <p class="text-darkGray mt-1">{{ email }}</p>
      </div>
      <a href="#/edit"
        class="text-2xl text-darkGray absolute right-0 top-2"
      >
        <font-awesome-icon icon="pen-to-square" />
      </a>
    </section>
    <component :is="currentView" />
    <section class="mt-10">
      <h3 class="text-lg font-medium">Dashboard</h3>
      <div class="flex flex-col gap-1 mt-5">
        <a href="#" class="flex items-center gap-3 py-2">
          <span
            class="flex justify-center items-center text-white w-8 h-8 bg-primary rounded-full"
          >
            <font-awesome-icon icon="plus" />
          </span>
          Unggah Peliharaan
        </a>
        <a href="#" class="flex items-center gap-3 py-2">
          <span
            class="flex justify-center items-center text-white w-8 h-8 bg-pink rounded-full"
          >
            <font-awesome-icon icon="heart"/>
          </span>
          Favorit Saya
        </a>
        <a href="#" class="flex items-center gap-3 py-2">
          <span
            class="flex justify-center items-center text-white w-8 h-8 bg-darkGray rounded-full"
          >
            <font-awesome-icon icon="clock" />
          </span>
          Terakhir Dilihat
        </a>
        <a href="#" class="flex items-center gap-3 py-2">
          <span
            class="flex justify-center items-center text-white w-8 h-8 bg-secondary rounded-full"
          >
            <font-awesome-icon icon="paw" />
          </span>
          Unggahan Saya
        </a>
      </div>
    </section>
    <button class="text-pink border-2 border-pink rounded-md py-2 px-10 font-semibold mt-10 focus:bg-pink focus:text-white active:bg-pink active:text-white" @click="signOutHandler">
      Keluar
    </button>
  </main>
</template>

<style></style>
