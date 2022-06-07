<script setup>
import { ref } from 'vue'
import axios from 'axios'
import AutoCompleteList from '../../components/desktop/AutoCompleteList.vue'
import cities from '../../utils/cities'

const cityInput = ref('')
const autoCompleteListVisible = ref(false)
const filteredCities = ref([])
const pets = ref([])
const petGenders = ref([])

axios.get('http://localhost:4000/pets').then(res => {
  pets.value = res.data.pets
  res.data.pets.forEach(pet => {
    if (pet.gender === 'Jantan') {
      petGenders.value.push('mars')
    } else if (pet.gender === 'Betina') {
      petGenders.value.push('venus')
    }
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
  cityInput.value = choosenCity
  autoCompleteListVisible.value = false
}
</script>

<template>
  <main class="bg-white">
    <section class="relative h-[40vh] text-white bg-[url('../assets/images/hero-large.jpg')] bg-cover bg-bottom bg-no-repeat bg-fixed">
      <div class="absolute top-0 left-0 h-full w-full bg-darkFilter"></div>
      <div
        class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center gap-4"
      >
        <h2 class="font-montserrat text-4xl font-bold">Get your bestie</h2>
        <form class="text-black w-[75vw] flex gap-3" @submit.prevent="">
          <div class="relative w-full">
            <input
              type="search"
              class="py-2 pl-10 pr-3 w-full text-sm rounded focus:outline-0"
              placeholder="Masukkan jenis peliharaan"
            />
            <span
              class="absolute top-0 left-0 h-full w-10 flex items-center justify-center text-darkGray"
              ><font-awesome-icon icon="magnifying-glass"
            /></span>
          </div>
          <div class="relative w-full">
            <input
              type="search"
              class="py-2 pl-10 pr-3 w-full text-sm rounded focus:outline-0"
              placeholder="Masukkan kota"
              v-model="cityInput"
              @keyup="autoCompleteHandler"
            />
            <span
              class="absolute top-0 left-0 h-full w-10 flex items-center justify-center text-darkGray"
              ><font-awesome-icon icon="location-dot"
            /></span>
            <AutoCompleteList
              :cities="filteredCities"
              :clickHandler="useAutocomplete"
              v-show="autoCompleteListVisible"
            />
          </div>
          <button
            class="bg-primary text-white text-sm font-semibold w-1/5 rounded"
          >
            Cari
          </button>
        </form>
      </div>
    </section>
    <section class="pt-6 pb-1 px-10">
      <h3 class="font-semibold text-lg text-darkGray mb-4">
        Peliharaan Berdasarkan Kategori
      </h3>
      <div class="grid grid-cols-4 gap-5">
        <a href="#" class="h-72 rounded-lg shadow-andopt">
          <div class="h-5/6">
            <img
              src="../../assets/images/cat.jpg"
              alt="kucing silver"
              class="w-full h-full object-cover rounded-t-lg"
              draggable="false"
            />
          </div>
          <h4 class="font-medium py-2 h-1/6 flex items-center justify-center">
            Kucing
          </h4>
        </a>
        <a href="#" class="h-72 rounded-lg shadow-andopt">
          <div class="h-5/6">
            <img
              src="../../assets/images/dog.jpg"
              alt="anjing duduk di lantai"
              class="w-full h-full object-cover rounded-t-lg"
              draggable="false"
            />
          </div>
          <h4 class="font-medium py-2 h-1/6 flex items-center justify-center">
            Anjing
          </h4>
        </a>
        <a href="#" class="h-72 rounded-lg shadow-andopt">
          <div class="h-5/6">
            <img
              src="../../assets/images/bird.jpg"
              alt="lovebird di ranting pohon"
              class="w-full h-full object-cover rounded-t-lg"
              draggable="false"
            />
          </div>
          <h4 class="font-medium py-2 h-1/6 flex items-center justify-center">
            Burung
          </h4>
        </a>
        <a href="#" class="h-72 rounded-lg shadow-andopt">
          <div class="h-5/6 flex justify-center items-center">
            <img
              src="../../assets/icons/paw-gray.svg"
              alt="ikon paw"
              class="w-2/3 h-2/3"
              draggable="false"
            />
          </div>
          <h4 class="font-medium py-2 h-1/6 flex items-center justify-center">
            Lainnya
          </h4>
        </a>
      </div>
    </section>
    <section class="pt-10 pb-1 px-10">
      <h3 class="font-semibold text-lg text-darkGray mb-4">
        Yang Mungkin Anda Suka
      </h3>
      <div class="grid grid-cols-6 gap-5">
        <a :href="'pet/'+pet.id" class="h-72 rounded-lg shadow-andopt" :id="pet.id" v-for="(pet, index) in pets" :key="pet.id">
          <div class="h-3/6">
            <img
              :src="pet.imageUrls[0]"
              :alt="pet.name"
              class="w-full h-full object-cover rounded-t-lg"
              draggable="false"
            />
          </div>
          <div class="py-3 px-4 h-3/6">
            <h4 class="font-semibold truncate">
              <font-awesome-icon :icon="petGenders[index]" class="text-darkGray text-2xl mr-1" />
              {{ pet.name }}
            </h4>
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
        </a>
      </div>
    </section>
    <section class="pt-10 pb-1 px-10">
      <h3 class="font-semibold text-lg text-darkGray mb-4">Artikel Terbaru</h3>
      <div class="grid grid-cols-3 gap-5">
        <div class="h-[450px] rounded-lg shadow-andopt">
          <div class="h-3/6">
            <img
              src="../../assets/images/cat.jpg"
              alt="kucing silver"
              class="w-full h-full object-cover rounded-t-lg"
              draggable="false"
            />
          </div>
          <div class="py-3 px-4 h-3/6">
            <h4 class="font-semibold truncate">Cara Merawat Kucing Anggora</h4>
            <p class="text-sm font-medium text-darkGray">Pet Care</p>
            <p class="text-sm text-ellipsis overflow-hidden mt-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam
              accusamus porro dolore deserunt omnis quas cupiditate, vel libero
              in saepe praesentium similique quidem tenetur labore recusandae
              expedita, amet ratione. Numquam.
            </p>
            <a href="#" class="text-sm text-primary mt-4 inline-block"
              >Baca Selengkapnya</a
            >
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
