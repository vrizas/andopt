<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import AutoCompleteList from '../../../components/desktop/user/AutoCompleteList.vue'
import cities from '../../../utils/cities'
import CONFIG from '../../../config'
import HeaderBar from '../../../components/mobile/HeaderBar.vue'

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
const newLoc = route.params.location.replace(/_/g, '.')
const queryInput = ref(route.params.query)
const locInput = ref(newLoc)
const autoCompleteListVisible = ref(false)
const filteredCities = ref([])
const pets = ref([])
const petGenders = ref([])
const filters = ref({
  cat: false,
  dog: false,
  turtle: false,
  bird: false,
  rabbit: false,
  fish: false
})
const catFilter = ref(false)
const dogFilter = ref(false)
const turtleFilter = ref(false)
const birdFilter = ref(false)
const rabbitFilter = ref(false)
const fishFilter = ref(false)

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
  }
  getSearchData(route.params.query, route.params.location)
})

const getSearchData = (query, location) => {
  if (query && location) {
    axios.get(`${CONFIG.API_BASE_URL}/pets/${query}/${newLoc}`).then(res => {
      pets.value = res.data.pets
      res.data.pets.forEach(pet => {
        if (pet.gender === 'Jantan') {
          petGenders.value.push('mars')
        } else if (pet.gender === 'Betina') {
          petGenders.value.push('venus')
        }
      })
    })
  } else if (query && !location) {
    axios.get(`${CONFIG.API_BASE_URL}/pets/query/${query}`).then(res => {
      pets.value = res.data.pets
      res.data.pets.forEach(pet => {
        if (pet.gender === 'Jantan') {
          petGenders.value.push('mars')
        } else if (pet.gender === 'Betina') {
          petGenders.value.push('venus')
        }
      })
    })
  } else if (!query && location) {
    axios.get(`${CONFIG.API_BASE_URL}/pets/location/${location}`).then(res => {
      pets.value = res.data.pets
      res.data.pets.forEach(pet => {
        if (pet.gender === 'Jantan') {
          petGenders.value.push('mars')
        } else if (pet.gender === 'Betina') {
          petGenders.value.push('venus')
        }
      })
    })
  } else {
    axios.get(`${CONFIG.API_BASE_URL}/pets`).then(res => {
      pets.value = res.data.pets
      res.data.pets.forEach(pet => {
        if (pet.gender === 'Jantan') {
          petGenders.value.push('mars')
        } else if (pet.gender === 'Betina') {
          petGenders.value.push('venus')
        }
      })
    })
  }

  if (user.value) {
    user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
      axios.get(`${CONFIG.API_BASE_URL}/user/${user.value.uid}/likes`, {
        headers: {
          'X-Firebase-Token': idToken
        }
      }).then(res => {
        pets.value.forEach(pet => {
          pet.isLiked = !!res.data.likes.find(like => like.pet_id === pet.id)
          pet.like_id = res.data.likes.find(like => like.pet_id === pet.id)?.id
        })
      })
    })
  }
}

const autoCompleteHandler = (e) => {
  const userData = e.target.value
  if (userData) {
    filteredCities.value = cities.value.filter((city) => city.toLowerCase().includes(userData.toLowerCase()))
    autoCompleteListVisible.value = true
  } else {
    autoCompleteListVisible.value = false
  }
}

const useAutocomplete = (e) => {
  const choosenCity = e.target.innerText.trim()
  locInput.value = choosenCity
  autoCompleteListVisible.value = false
}

const searchPetHandler = (e) => {
  getSearchData(queryInput.value, locInput.value)
}

const filterPetHandler = (e, species) => {
  if (e.target.checked) {
    Object.keys(filters.value).forEach(key => {
      catFilter.value.checked = false
      dogFilter.value.checked = false
      turtleFilter.value.checked = false
      birdFilter.value.checked = false
      rabbitFilter.value.checked = false
      fishFilter.value.checked = false
      e.target.checked = true
      if (key === species) {
        filters.value[key] = true
      } else {
        filters.value[key] = false
      }
    })

    if (filters.value.cat === true) {
      getSearchData('kucing')
    } else if (filters.value.dog === true) {
      getSearchData('anjing')
    } else if (filters.value.turtle === true) {
      getSearchData('kura-kura')
    } else if (filters.value.bird === true) {
      getSearchData('burung')
    } else if (filters.value.rabbit === true) {
      getSearchData('kelinci')
    } else if (filters.value.fish === true) {
      getSearchData('ikan')
    }
  } else {
    Object.keys(filters.value).forEach(key => {
      if (key === species) {
        filters.value[key] = false
      }
    })
    getSearchData()
  }
}

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

const showLoginPopup = () => {
  window.location.hash = '/login'
}
</script>

<template>
    <div>
        <HeaderBar :isLoggedIn="isLoggedIn" :queryInput="queryInput" :locInput="locInput" :openChat="openChat" :openChatHandler="openChatHandler" :closeChatHandler="closeChatHandler" :chatReceiverUid="chatReceiverUid" :chatPetId="chatPetId" />
        <main class="flex flex-col">
            <aside class="shadow-andopt py-7 px-8 h-fit rounded-md">
                <form>
                    <section class="flex justify-between items-center text-sm">
                        <h2 class="font-semibold">Terapkan Filter</h2>
                        <button type="reset" class="text-primary font-semibold" @click="getSearchData()">Reset Filter</button>
                    </section>
                    <hr class="text-[#ccc] my-5">
                    <section>
                        <div>
                            <h3 class="text-sm font-medium">Berdasarkan Kategori</h3>
                            <div class="mt-4 flex flex-col gap-3">
                                <label for="cat" class="text-sm flex items-center gap-2">
                                    <input id="cat" type="checkbox" class="w-3 h-3 rounded" ref="catFilter" @click="e => filterPetHandler(e, 'cat')">
                                    Kucing
                                </label>
                                <label for="dog" class="text-sm flex items-center gap-2">
                                    <input id="dog" type="checkbox" class="w-3 h-3 rounded" ref="dogFilter" @click="e => filterPetHandler(e, 'dog')" >
                                    Anjing
                                </label>
                                <label for="turtle" class="text-sm flex items-center gap-2">
                                    <input id="turtle" type="checkbox" class="w-3 h-3 rounded" ref="turtleFilter" @click="e => filterPetHandler(e, 'turtle')">
                                    Kura-kura
                                </label>
                                <label for="bird" class="text-sm flex items-center gap-2">
                                    <input id="bird" type="checkbox" class="w-3 h-3 rounded" ref="birdFilter" @click="e => filterPetHandler(e, 'bird')">
                                    Burung
                                </label>
                                <label for="rabbit" class="text-sm flex items-center gap-2">
                                    <input id="rabbit" type="checkbox" class="w-3 h-3 rounded" ref="rabbitFilter" @click="e => filterPetHandler(e, 'rabbit')">
                                    Kelinci
                                </label>
                                <label for="fish" class="text-sm flex items-center gap-2">
                                    <input id="fish" type="checkbox" class="w-3 h-3 rounded" ref="fishFilter" @click="e => filterPetHandler(e, 'fish')">
                                    Ikan
                                </label>
                            </div>
                        </div>
                    </section>
                </form>

            </aside>
            <section class="pt-5 pb-24 px-4">
                <p class="font-medium text-sm text-darkGray mb-4">
                    Menampilkan {{pets.length}} hasil pencarian
                </p>
                <div class="grid grid-cols-2 gap-3">
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
