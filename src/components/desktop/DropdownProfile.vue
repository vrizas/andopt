<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'
import defaultProfilePic from '../../assets/images/default-profile-pic.png'

const isMenuOpen = ref(false)
const router = useRouter()
const auth = getAuth()
const user = auth.currentUser
const username = ref('')
const profilePicUrl = ref('')
if (user) {
  username.value = user.displayName
  profilePicUrl.value = user.photoURL
}

const signOutHandler = () => {
  signOut(auth).then(() => {
    router.push('/')
  }).catch((error) => {
    alert(error.message)
  })
}
</script>

<template>
    <div class="relative" @mouseleave="isMenuOpen = false">
        <RouterLink to="/my" @mouseover="isMenuOpen = true">
            <img :src="profilePicUrl || defaultProfilePic" alt="profil" class="w-6 h-6 rounded-full object-cover" draggable="false">
        </RouterLink>
        <transition
        enter-active-class="transition ease-out duration-100"
        enter-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
        >
            <div v-if="isMenuOpen" class="py-2 absolute right-0">
                <div class="w-48 bg-white rounded-md shadow-andopt">
                    <p class="flex justify-between py-2 px-3 text-sm mb-3">
                        <span class="flex gap-2 items-center font-semibold truncate">
                            <img :src="profilePicUrl || defaultProfilePic" alt="profil" class="w-8 h-8 rounded-full object-cover" draggable="false">
                            {{ username }}
                        </span>
                        <RouterLink to="/my" class="text-darkGray">
                            <font-awesome-icon icon="gear" />
                        </RouterLink>
                    </p>
                    <RouterLink to="/my/pet/add" class="flex gap-2 items-center py-2 px-3 hover:bg-primaryFilter rounded-b-md">
                        <span class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                            <font-awesome-icon icon="plus" />
                        </span>
                        Unggah Peliharaan
                    </RouterLink>
                    <RouterLink to="/my/favorites" class="flex gap-2 items-center py-2 px-3 hover:bg-primaryFilter rounded-b-md">
                        <span class="w-6 h-6 rounded-full bg-pink text-white flex items-center justify-center text-xs">
                            <font-awesome-icon icon="heart"/>
                        </span>
                        Favorit Saya
                    </RouterLink>
                    <RouterLink to="/my/lastseen" class="flex gap-2 items-center py-2 px-3 hover:bg-primaryFilter rounded-b-md">
                        <span class="w-6 h-6 rounded-full bg-darkGray text-white flex items-center justify-center text-xs">
                            <font-awesome-icon icon="clock" />
                        </span>
                        Terakhir Dilihat
                    </RouterLink>
                    <RouterLink to="/my/upload" class="flex gap-2 items-center py-2 px-3 hover:bg-primaryFilter rounded-b-md">
                        <span class="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs">
                            <font-awesome-icon icon="paw" />
                        </span>
                        Unggahan Saya
                    </RouterLink>
                    <hr class="text-lightGray">
                    <button class=" w-full flex gap-2 items-center py-2 px-3 hover:bg-pink hover:text-white rounded-b-md" @click="signOutHandler">
                        <font-awesome-icon icon="right-from-bracket" />
                        Keluar
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>
