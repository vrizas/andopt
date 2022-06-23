<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import CONFIG from '../../../config'
import HeaderBar from '../../../components/mobile/HeaderBar.vue'

const pets = ref([])
const petGenders = ref([])

const auth = getAuth()
const user = ref(null)
const isLoggedIn = ref(false)

onAuthStateChanged(auth, (account) => {
  if (account) {
    user.value = account
    isLoggedIn.value = true
    user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
      axios.get(`${CONFIG.API_BASE_URL}/user/${account.uid}`, {
        headers: {
          'X-Firebase-Token': idToken
        }
      }).then(res => {
        const lastseens = res.data.user.lastseen
        axios.get(`${CONFIG.API_BASE_URL}/pets`).then(res => {
          const data = []
          lastseens.forEach(lastseen => {
            const result = res.data.pets.find(pet => pet.id === lastseen.pet_id)
            const pet = {
              lastseen_id: lastseen.id,
              ...result
            }

            if (result) {
              data.push(pet)
            }
          })

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

          pets.value.forEach(pet => {
            if (pet.gender === 'Jantan') {
              petGenders.value.push('mars')
            } else if (pet.gender === 'Betina') {
              petGenders.value.push('venus')
            }
          })
        })
      })
    })
  } else {
    user.value = null
    isLoggedIn.value = false
    window.location.href = '/#/login'
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

const deleteLastseenHandler = (lastseenId) => {
  user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
    axios.delete(`${CONFIG.API_BASE_URL}/user/${user.value.uid}/lastseen/${lastseenId}`, {
      headers: {
        'X-Firebase-Token': idToken
      }
    }).then(res => {
      pets.value = pets.value.filter(pet => pet.lastseen_id !== lastseenId)
    })
  })
}
</script>

<template>
  <div>
    <HeaderBar :isLoggedIn="isLoggedIn" />
    <main class="pt-5 pb-24 px-4">
      <h2 class="text-primary font-semibold mb-4">Terakhir Dilihat</h2>
      <div class="grid grid-cols-2 gap-3">
        <RouterLink to="/" class="inline-block h-64 px-5 text-center text-sm font-semibold rounded-lg shadow-andopt flex justify-center items-center" v-if="pets.length===0">
          Jelajahi Hewan Peliharaan Pilihanmu
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
    </main>
  </div>
</template>
