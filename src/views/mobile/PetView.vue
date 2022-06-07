<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRoute } from 'vue-router'
import HeaderBar from '../../components/mobile/HeaderBar.vue'

const route = useRoute()
const tabImages = ref(null)
const activeTabImage = ref(0)
const scrollAmount = ref(0)
const scrollMin = ref(0)
const pet = ref(null)
const petGender = ref('')
const writerUsername = ref('')
const isLoggedIn = ref(false)
const auth = getAuth()

onAuthStateChanged(auth, (account) => {
  if (account) {
    isLoggedIn.value = true
  } else {
    isLoggedIn.value = false
  }
})

axios.get(`http://localhost:4000/pet/${route.params.id}`).then(res => {
  pet.value = res.data.pet
  if (res.data.pet.gender === 'Jantan') {
    petGender.value = 'mars'
  } else if (res.data.pet.gender === 'Betina') {
    petGender.value = 'venus'
  }

  axios.get(`http://localhost:4000/user/${pet.value.user_uid}`).then(res => {
    writerUsername.value = res.data.user.username
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
</script>

<template>
    <div>
        <HeaderBar :isLoggedIn="isLoggedIn" />
        <main class="pb-24 flex flex-col gap-8 bg-white">
            <section class="relative flex flex-col gap-5 items-center">
                <img :src="pet.imageUrls[activeTabImage]" alt="cat" class="w-full h-72 object-cover rounded-lg">
                <div class="relative" v-if="pet.imageUrls.length > 1">
                    <div class="flex gap-4 overflow-x-auto w-screen px-10 tab-images" ref="tabImages">
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
                    {{ pet.name }}
                    <font-awesome-icon :icon="petGender" class="text-darkGray text-2xl ml-3" />
                </h2>
                <p class="mt-2">{{ pet.type.name }} {{pet.type.race}}</p>
                <p class="font-medium text-darkGray mt-1">{{ pet.age }}</p>
                <p class="mt-3">
                    <font-awesome-icon
                    icon="location-dot"
                    class="text-primary mr-1"
                    />
                    {{ pet.location }}
                </p>
                <div class="mt-8">
                    <h3 class="font-medium text-lg text-darkGray mb-2">Deskripsi</h3>
                    <p class="text-sm">{{ pet.desc }}</p>
                </div>
            </section>
            <aside class="shadow-andopt w-full py-8 px-6 rounded-lg h-fit">
                <h4 class="text-xs text-medium text-darkGray mb-2">Pemilik</h4>
                <a href="#" class="flex gap-2 items-center font-semibold truncate">
                    <img src="../../assets/images/default-profile-pic.png" alt="profil" class="w-8 h-8 rounded-full object-cover" draggable="false">
                    {{ writerUsername }}
                </a>
                <hr class="my-4 text-lightGray">
                <div class="flex flex-col gap-3">
                    <button class="bg-primary text-white font-semibold text-sm py-1 px-5 w-full rounded-md">
                        <font-awesome-icon icon="comment-dots" class="mr-1" />
                        Chat
                    </button>
                    <button class="bg-secondary text-white font-semibold text-sm py-1 px-5 w-full rounded-md">
                        <font-awesome-icon icon="paw" class="mr-1" />
                        Adopsi
                    </button>
                    <button class="border border-pink text-pink hover:bg-pink hover:text-white font-semibold text-sm py-1 px-5 w-full rounded-md">
                        <font-awesome-icon icon="heart" class="mr-1"/>
                        Sukai
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
