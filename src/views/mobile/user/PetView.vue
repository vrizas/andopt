<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import skeleton from '../../../assets/images/skeleton.jpg'
import CONFIG from '../../../config'

defineProps({
  openChatHandler: {
    type: Function,
    default: () => {}
  }
})

const route = useRoute()
const isLiked = ref(false)
const likeId = ref('')
const tabImages = ref(null)
const activeTabImage = ref(0)
const scrollAmount = ref(0)
const scrollMin = ref(0)
const pet = ref(null)
const petGender = ref('')
const writerUser = ref(null)
const auth = getAuth()
const user = ref(null)

onAuthStateChanged(auth, (account) => {
  if (account) {
    user.value = account
    user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
      axios.post(`${CONFIG.API_BASE_URL}/user/${user.value.uid}/lastseen`, {
        pet_id: route.params.id
      }, {
        headers: {
          'X-Firebase-Token': idToken
        }
      })

      axios.get(`${CONFIG.API_BASE_URL}/pet/${route.params.id}/likes`, {
        headers: {
          'X-Firebase-Token': idToken
        }
      }).then(res => {
        res.data.likes.forEach(like => {
          if (like.user_uid === user.value.uid) {
            isLiked.value = true
            likeId.value = like.id
          }
        })
      })
    }).catch(function (error) {
      alert(error.message)
    })
  } else {
    user.value = null
  }
})

axios.get(`${CONFIG.API_BASE_URL}/pet/${route.params.id}`).then(res => {
  pet.value = res.data.pet
  if (res.data.pet.gender === 'Jantan') {
    petGender.value = 'mars'
  } else if (res.data.pet.gender === 'Betina') {
    petGender.value = 'venus'
  }

  axios.get(`${CONFIG.API_BASE_URL}/user/${pet.value.user_uid}`).then(response => {
    writerUser.value = response.data.user
  })
})

const scrollRightHandler = () => {
  tabImages.value.scrollTo({
    top: 0,
    left: Math.max(scrollAmount.value += 500, tabImages.value.clientWidth),
    behavior: 'smooth'
  })
}

const scrollLeftHandler = () => {
  tabImages.value.scrollTo({
    top: 0,
    left: Math.min(scrollAmount.value -= 500, scrollMin.value),
    behavior: 'smooth'
  })
}

const likePetHandler = () => {
  if (user.value) {
    user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
      axios.post(`${CONFIG.API_BASE_URL}/pet/${route.params.id}/like`, {
        user_uid: user.value.uid
      }, {
        headers: {
          'X-Firebase-Token': idToken
        }
      }).then(res => {
        isLiked.value = true
        likeId.value = res.data.like.id
      })
    })
  } else {
    window.location.hash = '/login'
  }
}

const unlikePetHandler = () => {
  user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
    axios.delete(`${CONFIG.API_BASE_URL}/pet/${route.params.id}/like/${likeId.value}`, {
      headers: {
        'X-Firebase-Token': idToken
      }
    }).then(res => {
      isLiked.value = false
    })
  })
}
</script>

<template>
    <div>
        <HeaderBar :isLoggedIn="isLoggedIn" />
        <main class="pb-24 flex flex-col gap-8 bg-white">
            <section class="relative flex flex-col gap-5 items-center">
                <img :src="pet?.imageUrls[activeTabImage]" alt="cat" class="w-full h-72 object-cover">
                <div class="relative" v-if="pet?.imageUrls.length > 1">
                    <div class="flex gap-4 overflow-x-auto max-w-[600px] px-10 tab-images" ref="tabImages">
                        <img :src="url" alt="cat" class="w-16 h-16 object-cover rounded-md cursor-pointer" :class="{active: activeTabImage === index}" v-for="(url, index) in pet.imageUrls" :key="url" @mouseenter="activeTabImage = index">
                    </div>
                    <button class="absolute right-0 top-1/2 translate-y-[-50%] bg-lightGray w-8 h-8 rounded-full flex items-center justify-center" @click="scrollRightHandler">
                        <font-awesome-icon icon="chevron-right" />
                    </button>
                    <button class="absolute left-0 top-1/2 translate-y-[-50%] bg-lightGray w-8 h-8 rounded-full flex items-center justify-center" @click="scrollLeftHandler">
                        <font-awesome-icon icon="chevron-left" />
                    </button>
                </div>
            </section>
            <section class="px-4">
                <h2 class="font-bold text-xl">
                    {{ pet?.name }}
                    <font-awesome-icon :icon="petGender" class="text-darkGray text-2xl ml-3" />
                </h2>
                <p class="mt-2">{{ pet?.type.name }} {{pet?.type.race}}</p>
                <p class="font-medium text-darkGray mt-1">{{ pet?.age }}</p>
                <p class="mt-3">
                    <font-awesome-icon
                    icon="location-dot"
                    class="text-primary mr-1"
                    />
                    {{ pet?.location }}
                </p>
                <div class="mt-8">
                    <h3 class="font-medium text-lg text-darkGray mb-2">Deskripsi</h3>
                    <p class="text-sm">{{ pet?.desc }}</p>
                </div>
            </section>
            <aside class="shadow-andopt w-full py-8 px-6 rounded-lg h-fit">
                <h4 class="text-xs text-medium text-darkGray mb-2">Pemilik</h4>
                <RouterLink :to="'/profile/'+writerUser?.id" class="flex gap-2 items-center font-semibold truncate">
                    <img :src="writerUser?.photoURL" alt="profil" class="w-8 h-8 rounded-full object-cover" draggable="false">
                    {{ writerUser?.username }}
                </RouterLink>
                <hr class="my-4 text-lightGray">
                <div class="flex flex-col gap-3">
                    <button class="bg-primary text-white font-semibold text-sm py-1 px-5 w-full rounded-md" @click="openChatHandler(writerUser?.id, '')">
                        <font-awesome-icon icon="comment-dots" class="mr-1" />
                        Chat
                    </button>
                    <button class="bg-secondary text-white font-semibold text-sm py-1 px-5 w-full rounded-md" @click="openChatHandler(writerUser?.id, route.params.id)">
                        <font-awesome-icon icon="paw" class="mr-1" />
                        Adopsi
                    </button>
                    <button class="border border-pink text-pink font-semibold text-sm py-1 px-5 w-full rounded-md" v-if="!isLiked" @click="likePetHandler">
                      <font-awesome-icon icon="heart" class="mr-1"/>
                      Sukai
                    </button>
                    <button class="bg-pink text-white font-semibold text-sm py-1 px-5 w-full rounded-md" v-else @click="unlikePetHandler">
                      <font-awesome-icon icon="heart" class="mr-1"/>
                      Disukai
        </button>
                </div>
            </aside>
        </main>
    </div>
</template>

<style scoped>
  .tab-images .active {
    border: 4px solid #2F957F;
  }

  .tab-images::-webkit-scrollbar {
      display: none;
  }

  .tab-images {
      -ms-overflow-style: none;
      scrollbar-width: none;
  }
</style>
