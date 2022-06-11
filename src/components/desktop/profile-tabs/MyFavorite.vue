<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const pets = ref([])
const petGenders = ref([])

const auth = getAuth()
const user = ref(null)

onAuthStateChanged(auth, (account) => {
  if (account) {
    user.value = account

    user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
      axios.get(`http://localhost:4000/user/${account.uid}/likes`, {
        headers: {
          'X-Firebase-Token': idToken
        }
      }).then(res => {
        res.data.likes.forEach(like => {
          axios.get(`http://localhost:4000/pet/${like.pet_id}`).then(response => {
            const pet = {
              pet_id: like.pet_id,
              ...response.data.pet
            }
            pets.value.push(pet)
          })
        })

        pets.value.forEach(pet => {
          if (pet.gender === 'Jantan') {
            petGenders.value.push('mars')
          } else if (pet.gender === 'Betina') {
            petGenders.value.push('venus')
          }
        })
      })
    })
  }
})

const deleteLastseenHandler = (lastseenId) => {
  axios.delete(`http://localhost:4000/user/${user.value.uid}/lastseen/${lastseenId}`).then(res => {
    pets.value = pets.value.filter(pet => pet.lastseen_id !== lastseenId)
  })
}
</script>

<template>
    <section class="shadow-andopt py-8 px-10 rounded-md">
      <h2 class="text-primary text-lg font-semibold mb-8">Favorit Saya</h2>
      <RouterLink to="/" class="inline-block h-72 w-1/4 px-5 text-center text-sm font-semibold rounded-lg shadow-andopt flex justify-center items-center" v-if="pets.length===0">
        Jelajahi Hewan Peliharaan Pilihanmu
      </RouterLink>
      <div class="grid grid-cols-4 gap-5">
          <div class="h-72 rounded-lg shadow-andopt" v-for="(pet, index) in pets" :key="pet.id" :id="pet.lastseen_id">
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
              <a :href="'/pet/'+pet.id">
                <h4 class="font-semibold truncate">
                  <font-awesome-icon :icon="petGenders[index]" class="text-darkGray text-2xl mr-1" />
                  {{ pet.name }}
                </h4>
              </a>
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
</template>
