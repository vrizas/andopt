<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HeaderBarHome from '../../components/mobile/HeaderBarHome.vue'
import CONFIG from '../../config'

const pets = ref([])
const petGenders = ref([])
const isLoggedIn = ref(false)
const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  if (user) {
    isLoggedIn.value = true
  } else {
    isLoggedIn.value = false
  }
})

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
            <a href="#" class="h-60 rounded-md shadow-andopt">
              <div class="h-5/6">
                <img
                  src="../../assets/images/cat.jpg"
                  alt="kucing silver"
                  class="w-full h-full object-cover rounded-t-md"
                  draggable="false"
                />
              </div>
              <h4 class="font-medium text-sm py-2 h-1/6 flex items-center justify-center">
                Kucing
              </h4>
            </a>
            <a href="#" class="h-60 rounded-lg shadow-andopt">
              <div class="h-5/6">
                <img
                  src="../../assets/images/dog.jpg"
                  alt="anjing duduk di lantai"
                  class="w-full h-full object-cover rounded-t-lg"
                  draggable="false"
                />
              </div>
              <h4 class="font-medium text-sm py-2 h-1/6 flex items-center justify-center">
                Anjing
              </h4>
            </a>
            <a href="#" class="h-60 rounded-lg shadow-andopt">
              <div class="h-5/6">
                <img
                  src="../../assets/images/bird.jpg"
                  alt="lovebird di ranting pohon"
                  class="w-full h-full object-cover rounded-t-lg"
                  draggable="false"
                />
              </div>
              <h4 class="font-medium text-sm py-2 h-1/6 flex items-center justify-center">
                Burung
              </h4>
            </a>
            <a href="#" class="h-60 rounded-lg shadow-andopt">
              <div class="h-5/6 flex justify-center items-center">
                <img
                  src="../../assets/icons/paw-gray.svg"
                  alt="ikon paw"
                  class="w-2/3 h-2/3"
                  draggable="false"
                />
              </div>
              <h4 class="font-medium text-sm py-2 h-1/6 flex items-center justify-center">
                Lainnya
              </h4>
            </a>
          </div>
        </section>
        <section class="pt-10 pb-1 px-4">
          <h3 class="font-semibold text-darkGray mb-4">
            Yang Mungkin Anda Suka
          </h3>
          <div class="grid grid-cols-2 gap-3">
            <a :href="'pet/'+pet.id" class="h-64 rounded-md shadow-andopt" :id="pet.id" v-for="(pet, index) in pets" :key="pet.id">
              <div class="h-3/6">
                <img
                  :src="pet.imageUrls[0]"
                  :alt="pet.name"
                  class="w-full h-full object-cover rounded-t-lg"
                  draggable="false"
                />
              </div>
              <div class="py-3 px-4 h-3/6">
                <h4 class="font-semibold truncate text-sm">
                  <font-awesome-icon :icon="petGenders[index]" class="text-darkGray text-xl mr-1" />
                  {{ pet.name }}
                </h4>
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
            </a>
          </div>
        </section>
        <section class="pt-10 pb-1 px-4">
          <h3 class="font-semibold text-darkGray mb-4">Artikel Terbaru</h3>
          <div class="grid grid-cols-1 gap-3">
            <div class="h-[380px] rounded-lg shadow-andopt">
              <div class="h-3/6">
                <img
                  src="../../assets/images/cat.jpg"
                  alt="kucing silver"
                  class="w-full h-full object-cover rounded-t-lg"
                  draggable="false"
                />
              </div>
              <div class="py-3 px-4 h-3/6">
                <h4 class="text-sm font-semibold truncate">Cara Merawat Kucing Anggora</h4>
                <p class="text-xs font-medium text-darkGray">Pet Care</p>
                <p class="text-xs text-ellipsis overflow-hidden mt-2">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam
                  accusamus porro dolore deserunt omnis quas cupiditate, vel libero
                  in saepe praesentium similique quidem tenetur labore recusandae
                  expedita, amet ratione. Numquam.
                </p>
                <a href="#" class="text-xs text-primary mt-4 inline-block"
                  >Baca Selengkapnya</a
                >
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
