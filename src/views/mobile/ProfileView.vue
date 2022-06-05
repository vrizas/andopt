<script setup>
import {
  ref, onMounted, reactive, computed
} from 'vue'
import gsap from 'gsap'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import defaultProfilePic from '../../assets/images/default-profile-pic.png'

const router = useRouter()
const auth = getAuth()
const user = auth.currentUser
const username = ref('')
const email = ref('')
const profilePicUrl = ref('')
if (user) {
  username.value = user.displayName
  email.value = user.email
  profilePicUrl.value = user.photoURL
}

const editProfilePopupContainer = ref(null)
const editProfilePopup = ref(null)
const currentHashLink = reactive({
  hash: '#'
})

function showEditProfilePopUpHandler () {
  currentHashLink.hash = '#edit'
  gsap.to(editProfilePopup.value, { duration: 0.3, y: 0, ease: 'power2' })

  history.replaceState(undefined, undefined, '#edit')
}

function closeEditProfilePopUpHandler () {
  gsap.to(editProfilePopup.value, { duration: 0.3, y: '100%', ease: 'power2' })
  setTimeout(() => {
    currentHashLink.hash = '#'
    history.replaceState(undefined, undefined, '#')
  }, 300)
}

const signOutHandler = () => {
  signOut(auth).then(() => {
    router.push('/')
  }).catch((error) => {
    alert(error.message)
  })
}

const showEditProfilePopUp = computed(() => currentHashLink.hash === '#edit')

onMounted(() => {
  currentHashLink.hash = window.location.hash || '#'

  if (currentHashLink.hash === '#edit') {
    showEditProfilePopUpHandler()
  }
})
</script>

<template>
  <main class="py-8 px-4">
    <section class="flex items-center gap-4 relative">
      <img :src="profilePicUrl || defaultProfilePic" alt="profil" width="100" height="100">
      <div>
        <h2 class="text-xl font-semibold">{{ username }}</h2>
        <p class="text-darkGray mt-1">{{ email }}</p>
      </div>
      <button
        class="text-2xl text-darkGray absolute right-0 top-2"
        @click="showEditProfilePopUpHandler"
      >
        <font-awesome-icon icon="pen-to-square" />
      </button>
    </section>
    <section
      class="absolute top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
      ref="editProfilePopupContainer"
      v-show="showEditProfilePopUp"
    >
      <div
        class="w-full h-full bg-white translate-y-full py-4 px-5 absolute top-0 left-0"
        ref="editProfilePopup"
      >
        <button
          class="absolute right-5 text-2xl"
          @click="closeEditProfilePopUpHandler"
        >
          <font-awesome-icon icon="xmark" />
        </button>
        <h2 class="text-primary text-2xl font-semibold my-5">Sunting Profil</h2>
        <div class="flex justify-center">
          <img :src="profilePicUrl || defaultProfilePic" alt="profil" width="120" height="120">
        </div>
        <form class="flex flex-col gap-3 mt-10">
          <div class="flex flex-col gap-1">
            <label for="username">Username</label>
            <input
              class="py-3 px-4 bg-white border-b-2 border-primary"
              type="text"
              id="username"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="email">Email</label>
            <input
              class="py-3 px-4 bg-white border-b-2 border-primary"
              type="email"
              id="email"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="password">Password</label>
            <input
              class="py-3 px-4 bg-white border-b-2 border-primary"
              type="password"
              id="password"
            />
          </div>
          <div class="w-full text-center">
            <button
              class="bg-primary text-white px-4 py-3 w-1/3 rounded-md font-semibold mt-4"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </section>
    <section class="mt-10">
      <h3 class="text-lg font-medium">Dashboard</h3>
      <div class="flex flex-col gap-4 mt-5">
        <a href="#" class="flex items-center gap-3">
          <span
            class="flex justify-center items-center text-white w-8 h-8 bg-pink rounded-full"
          >
            <font-awesome-icon icon="heart"/>
          </span>
          Favorit Saya
        </a>
        <a href="#" class="flex items-center gap-3">
          <span
            class="flex justify-center items-center text-white w-8 h-8 bg-darkGray rounded-full"
          >
            <font-awesome-icon icon="clock" />
          </span>
          Terakhir Dilihat
        </a>
        <a href="#" class="flex items-center gap-3">
          <span
            class="flex justify-center items-center text-white w-8 h-8 bg-secondary rounded-full"
          >
            <font-awesome-icon icon="paw" />
          </span>
          Unggahan Saya
        </a>
      </div>
    </section>
    <button class="text-pink border-2 border-pink rounded-md py-2 px-8 font-semibold mt-10 focus:bg-pink focus:text-white active:bg-pink active:text-white" @click="signOutHandler">
      Keluar
    </button>
  </main>
</template>

<style></style>
