<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import CONFIG from '../../../../config'

const pets = ref([])
const petGenders = ref([])
const user = ref(null)

const auth = getAuth()
onAuthStateChanged(auth, (account) => {
  if (account) {
    user.value = account
    axios.get(`${CONFIG.API_BASE_URL}/pets`).then(res => {
      const data = res.data.pets.filter(pet => pet.user_uid === user.value.uid)
      user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
        axios.get(`${CONFIG.API_BASE_URL}/user/${account.uid}/likes`, {
          headers: {
            'X-Firebase-Token': idToken
          }
        }).then(res => {
          data.forEach(pet => {
            pet.isLiked = !!res.data.likes.find(like => like.pet_id === pet.id)
            pet.like_id = res.data.likes.find(like => like.pet_id === pet.id)?.id
          })
          pets.value = data
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
  }
})

const likePetHandler = (petId) => {
  if (user.value) {
    user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
      axios.post(`${CONFIG.API_BASE_URL}/pet/${petId}/like`, {
        user_uid: user.value.uid
      }, {
        headers: {
          'X-Firebase-Token': idToken
        }
      }).then(res => {
        pets.value.forEach((pet) => {
          if (pet.id === petId) {
            pet.isLiked = true
            pet.like_id = res.data.like.id
          }
        })
      })
    })
  } else {
    window.location.hash = '/login'
  }
}

const unlikePetHandler = (petId, likeId) => {
  user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
    axios.delete(`${CONFIG.API_BASE_URL}/pet/${petId}/like/${likeId}`, {
      headers: {
        'X-Firebase-Token': idToken
      }
    }).then(res => {
      pets.value.forEach((pet) => {
        if (pet.id === petId) {
          pet.isLiked = false
          pet.like_id = null
        }
      })
    })
  })
}

</script>

<template>
    <section class="shadow-andopt py-8 px-10 rounded-md">
        <h2 class="text-primary text-lg font-semibold mb-8">Unggahan Saya</h2>
        <RouterLink to="/my/pet/add" class="inline-block h-72 w-1/4 rounded-lg shadow-andopt flex justify-center items-center" v-if="pets.length===0">
            <span class="text-3xl text-secondary">
                <font-awesome-icon icon="cat" />
                <font-awesome-icon icon="plus" />
            </span>
        </RouterLink>
        <div class="grid grid-cols-4 gap-5">
            <div class="h-72 rounded-lg shadow-andopt" :id="pet.id" v-for="(pet, index) in pets" :key="pet.id">
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
                  <button class="likeButton w-7 h-7 rounded-full bg-white text-lightGray flex justify-center items-center" v-else @click="likePetHandler(pet.id)">
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
</template>
