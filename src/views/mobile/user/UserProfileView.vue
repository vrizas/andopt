<script setup>
import { ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import defaultProfilePic from '../../../assets/images/default-profile-pic.png'
import axios from 'axios'
import HeaderBar from '../../../components/mobile/HeaderBar.vue'
import CONFIG from '../../../config'

defineProps({
  openChat: {
    type: Boolean,
    default: false
  },
  openChatHandler: {
    type: Function
  },
  closeChatHandler: {
    type: Function
  },
  chatReceiverUid: {
    type: String
  },
  chatPetId: {
    type: String
  }
})

const route = useRoute()
const user = ref(null)
const pets = ref([])
const petGenders = ref([])

axios.get(`${CONFIG.API_BASE_URL}/user/${route.params.id}`).then(res => {
  user.value = res.data.user
})

axios.get(`${CONFIG.API_BASE_URL}/pets`).then(res => {
  const petsTemp = res.data.pets.filter(pet => pet.user_uid === route.params.id)
  pets.value = petsTemp
  petsTemp.forEach(pet => {
    if (pet.gender === 'Jantan') {
      petGenders.value.push('mars')
    } else if (pet.gender === 'Betina') {
      petGenders.value.push('venus')
    }
  })
})

</script>

<template>
  <div>
    <HeaderBar :isLoggedIn="isLoggedIn" :queryInput="queryInput" :locInput="locInput" :openChat="openChat" :openChatHandler="openChatHandler" :closeChatHandler="closeChatHandler" :chatReceiverUid="chatReceiverUid" :chatPetId="chatPetId" />
    <main class="pt-5 pb-24 px-4 flex flex-col gap-10 min-h-[80vh]">
      <section class="flex items-center gap-4 h-fit">
        <img :src="user?.photoURL || defaultProfilePic" alt="profil" class="w-16 h-16 rounded-full object-cover" draggable="false">
        <div class="flex flex-col gap-2">
          <h2 class="font-semibold text-lg">{{user?.username}}</h2>
          <button class="bg-primary text-white font-semibold text-sm py-1 px-5 w-full rounded-md" @click="openChatHandler(route.params.id, '')">
            <font-awesome-icon icon="comment-dots" class="mr-1" />
            Chat
          </button>
        </div>
      </section>
      <section>
        <h3 class="font-semibold mb-4">Unggahan Pengguna</h3>
        <div class="grid grid-cols-2 gap-3">
          <RouterLink to="/" class="inline-block h-64 px-5 text-center text-xs font-semibold rounded-lg shadow-andopt flex justify-center items-center" v-if="pets.length===0">
            Tidak ada data unggahan. Jelajahi Hewan Peliharaan Pilihanmu
          </RouterLink>
          <div :to="'/pet/'+pet.id" class="h-64 rounded-md shadow-andopt" :id="pet.id" v-for="(pet, index) in pets" :key="pet.id">
              <div class="relative h-3/6">
                  <img
                  :src="pet.imageUrls[0]"
                  :alt="pet.name"
                  class="w-full h-full object-cover rounded-t-lg"
                  draggable="false"
                  />
                  <div class="flex gap-2 absolute top-2 right-2">
                      <button class="likeButton w-7 h-7 rounded-full bg-white text-pink flex justify-center items-center" v-if="pet.isLiked" @click="unlikePetHandler(pet.id, pet.like_id)">
                          <font-awesome-icon icon="heart" class="icon" />
                      </button>
                      <button class="likeButton w-7 h-7 rounded-full bg-white text-lightGray flex justify-center items-center" v-else-if="pet.isLiked===false" @click="likePetHandler(pet.id)">
                          <font-awesome-icon icon="heart" class="icon" />
                      </button>
                      <button class="likeButton w-7 h-7 rounded-full bg-white text-lightGray flex justify-center items-center" v-else-if="!user" @click="showLoginPopup">
                          <font-awesome-icon icon="heart" class="icon" />
                      </button>
                  </div>
              </div>
              <div class="py-3 px-4 h-3/6">
                  <RouterLink :to="'/pet/'+pet.id">
                  <h4 class="font-semibold truncate text-sm">
                      <font-awesome-icon :icon="petGenders[index]" class="text-darkGray text-xl mr-1" />
                      {{ pet.name }}
                  </h4>
                  </RouterLink>
                  <p class="text-xs mt-1 truncate">{{ pet.type.name }} {{pet.type.race}}</p>
                  <p class="text-xs mt-1 font-medium text-darkGray truncate">{{ pet.age }}</p>
                  <p class="text-xs mt-3 truncate">
                  <font-awesome-icon
                      icon="location-dot"
                      class="text-primary mr-1"
                  />
                  {{ pet.location.split(',')[0] }}
                  </p>
              </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
