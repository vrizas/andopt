<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import AutoCompleteList from '../../../components/desktop/user/AutoCompleteList.vue'
import cities from '../../../utils/cities'
import CONFIG from '../../../config'
import HeaderBarHome from '../../../components/mobile/HeaderBarHome.vue'

const queryInput = ref('')
const locInput = ref('')
const autoCompleteListVisible = ref(false)
const filteredCities = ref([])
const pets = ref([])
const petGenders = ref([])
const articles = ref([])
const isLoggedIn = ref(false)

const auth = getAuth()
const user = ref(null)

onAuthStateChanged(auth, (account) => {
  if (account) {
    isLoggedIn.value = true
    user.value = account
    axios.get(`${CONFIG.API_BASE_URL}/pets/newest`).then(res => {
      const data = res.data.pets
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
      res.data.pets.forEach(pet => {
        if (pet.gender === 'Jantan') {
          petGenders.value.push('mars')
        } else if (pet.gender === 'Betina') {
          petGenders.value.push('venus')
        }
      })
    })
  } else {
    isLoggedIn.value = false
    user.value = null
    axios.get(`${CONFIG.API_BASE_URL}/pets/newest`).then(res => {
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
})

axios.get(`${CONFIG.API_BASE_URL}/articles`).then(res => {
  let shouldSkip = false
  res.data.articles.forEach((article, index) => {
    if (index === 3) {
      shouldSkip = true
    }
    if (shouldSkip) {
      return
    }

    articles.value.push(article)
  })
})

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
  if (queryInput.value && locInput.value) {
    const newLocInput = locInput.value.replace(/\./g, '_')
    window.location.href = `/search/${queryInput.value}/${newLocInput}`
  } else if (queryInput.value && !locInput.value) {
    window.location.href = `/search/${queryInput.value}`
  } else if (!queryInput.value && locInput.value) {
    const newLocInput = locInput.value.replace(/\./g, '_')
    window.location.href = `/search/${newLocInput}`
  } else {
    window.location.href = '/search'
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
    <HeaderBarHome :isLoggedIn="isLoggedIn" />
    <main class="pb-24">
      <section class="relative h-[40vh] text-white bg-[url('../assets/images/hero-small.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
        <div class="absolute top-0 left-0 h-full w-full bg-darkFilter"></div>
        <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center">
          <h2 class="font-montserrat text-2xl font-bold">Get your bestie</h2>
        </div>
      </section>
      <div class="rounded-t-xl">
        <section class="pt-6 pb-1 px-4">
          <h3 class="font-semibold text-darkGray mb-4">
            Peliharaan Berdasarkan Kategori
          </h3>
          <div class="grid grid-cols-2 gap-3">
            <RouterLink to="#" class="h-60 rounded-md shadow-andopt">
              <div class="h-5/6">
                <img
                  src="../../../assets/images/cat.jpg"
                  alt="kucing silver"
                  class="w-full h-full object-cover rounded-t-md"
                  draggable="false"
                />
              </div>
              <h4 class="font-medium text-sm py-2 h-1/6 flex items-center justify-center">
                Kucing
              </h4>
            </RouterLink>
            <RouterLink to="#" class="h-60 rounded-lg shadow-andopt">
              <div class="h-5/6">
                <img
                  src="../../../assets/images/dog.jpg"
                  alt="anjing duduk di lantai"
                  class="w-full h-full object-cover rounded-t-lg"
                  draggable="false"
                />
              </div>
              <h4 class="font-medium text-sm py-2 h-1/6 flex items-center justify-center">
                Anjing
              </h4>
            </RouterLink>
            <RouterLink to="#" class="h-60 rounded-lg shadow-andopt">
              <div class="h-5/6">
                <img
                  src="../../../assets/images/bird.jpg"
                  alt="lovebird di ranting pohon"
                  class="w-full h-full object-cover rounded-t-lg"
                  draggable="false"
                />
              </div>
              <h4 class="font-medium text-sm py-2 h-1/6 flex items-center justify-center">
                Burung
              </h4>
            </RouterLink>
            <RouterLink to="#" class="h-60 rounded-lg shadow-andopt">
              <div class="h-5/6 flex justify-center items-center">
                <img
                  src="../../../assets/icons/paw-gray.svg"
                  alt="ikon paw"
                  class="w-2/3 h-2/3"
                  draggable="false"
                />
              </div>
              <h4 class="font-medium text-sm py-2 h-1/6 flex items-center justify-center">
                Lainnya
              </h4>
            </RouterLink>
          </div>
        </section>
        <section class="pt-10 pb-1 px-4">
          <h3 class="font-semibold text-darkGray mb-4">
            Yang Mungkin Anda Suka
          </h3>
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
        <section class="pt-10 pb-1 px-4">
          <h3 class="font-semibold text-darkGray mb-4">Artikel Terbaru</h3>
          <div class="grid grid-cols-1 gap-3">
            <div class="h-[380px] rounded-lg shadow-andopt" v-for="article in articles" :key="article.id">
              <div class="h-3/6">
                <img
                  :src="article.imageUrl"
                  :alt="article.title"
                  class="w-full h-full object-cover rounded-t-lg"
                  draggable="false"
                />
              </div>
              <div class="relative py-3 px-4 h-3/6">
                <h4 class="text-sm font-semibold truncate">{{article.title}}</h4>
                <p class="text-xs font-medium text-darkGray">{{article.category}}</p>
                <p class="text-xs text-ellipsis overflow-hidden mt-2" v-html="article.content"></p>
                <RouterLink :to="'/article/'+article.id" class="absolute bottom-5 text-xs text-primary inline-block">
                  Baca Selengkapnya
                </RouterLink>
              </div>
            </div>
          </div>
          <RouterLink to="/articles" class="font-medium text-xs block mt-5 text-right">
            Tampilkan Seluruh Artikel
          </RouterLink>
        </section>
      </div>
    </main>
  </div>
</template>
