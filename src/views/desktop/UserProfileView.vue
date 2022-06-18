<script setup>
import { ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import defaultProfilePic from '../../assets/images/default-profile-pic.png'
import axios from 'axios'
import CONFIG from '../../config'

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
  <main class="py-8 px-10 flex flex-col gap-10 min-h-[80vh]">
    <section class="flex items-center gap-4 h-fit">
      <img :src="user?.photoURL || defaultProfilePic" alt="profil" class="w-16 h-16 rounded-full object-cover" draggable="false">
      <div class="flex flex-col gap-2">
        <h2 class="font-semibold text-lg">{{user?.username}}</h2>
        <button class="bg-primary text-white font-semibold text-sm py-1 px-5 w-full rounded-md" @click="openChatHandler(writerUser?.id, '')">
          <font-awesome-icon icon="comment-dots" class="mr-1" />
          Chat
        </button>
      </div>
    </section>
    <section>
      <h3 class="font-semibold mb-4">Unggahan Pengguna</h3>
      <RouterLink to="/" class="inline-block h-72 w-1/6 px-5 text-center text-sm font-semibold rounded-lg shadow-andopt flex justify-center items-center" v-if="pets.length===0">
        Tidak ada data unggahan. Jelajahi Hewan Peliharaan Pilihanmu
      </RouterLink>
      <div class="grid grid-cols-6 gap-5">
        <div class="h-72 rounded-lg shadow-andopt" :id="pet.id" v-for="(pet, index) in pets" :key="pet.id">
          <div class="relative h-3/6">
            <img
              :src="pet.imageUrls[0]"
              :alt="pet.name"
              class="w-full h-full object-cover rounded-t-lg"
              draggable="false"
            />
            <div class="flex gap-2 absolute top-2 right-2">
              <button class="likeButton w-7 h-7 rounded-full bg-white text-lightGray flex justify-center items-center">
                <font-awesome-icon icon="heart" class="icon" />
              </button>
            </div>
          </div>
          <div class="py-3 px-4 h-3/6">
            <RouterLink :to="'/pet/'+pet.id">
              <h4 class="font-semibold truncate">
                <font-awesome-icon :icon="petGenders[index]" class="text-darkGray text-2xl mr-1" />
                {{ pet.name }}
              </h4>
            </RouterLink>
            <p class="text-sm mt-1 truncate">{{ pet.type.name }} {{pet.type.race}}</p>
            <p class="text-sm mt-1 font-medium text-darkGray truncate">{{ pet.age }}</p>
            <p class="text-sm mt-3 truncate">
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
</template>
