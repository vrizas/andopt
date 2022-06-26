<script setup>
import { gsap } from 'gsap'
import { ref, onMounted } from 'vue'
import cities from '../../../utils/cities'
import AutoCompleteList from '../../../components/desktop/user/AutoCompleteList.vue'

const props = defineProps({
  closeHandler: {
    type: Function,
    default: () => {}
  },
  query: {
    type: String,
    default: ''
  },
  loc: {
    type: String,
    default: ''
  }
})

const queryInput = ref(props.query)
const locInput = ref(props.loc)
const autoCompleteListVisible = ref(false)
const filteredCities = ref([])
const searchBarPopup = ref(null)

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

onMounted(() => {
  gsap.to(searchBarPopup.value, { duration: 0.3, y: 0, ease: 'power2' })
})
</script>

<template>
  <section
    class="fixed top-0 left-0 z-[999] w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="searchBarPopupContainer"
  >
    <div
      class="w-full h-full bg-white translate-y-full py-4 px-5 absolute top-0 left-0 overflow-y-auto text-center"
      ref="searchBarPopup"
    >
        <button class="absolute right-5 text-2xl" @click="closeHandler">
            <font-awesome-icon icon="xmark" />
        </button>
        <form class="text-black w-[85%] flex flex-col gap-3" @submit.prevent="searchPetHandler">
          <div class="relative w-full">
            <input
              type="search"
              class="py-2 pl-10 pr-3 w-full text-sm rounded shadow-andopt focus:outline-0 bg-white"
              placeholder="Masukkan jenis peliharaan"
              v-model="queryInput"
            />
            <span
              class="absolute top-0 left-0 h-full w-10 flex items-center justify-center text-darkGray"
              ><font-awesome-icon icon="magnifying-glass"
            /></span>
          </div>
          <div class="relative w-full">
            <input
              type="search"
              class="py-2 pl-10 pr-3 w-full text-sm rounded shadow-andopt focus:outline-0 bg-white"
              placeholder="Masukkan kota"
              v-model="locInput"
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
            class="bg-primary text-white text-sm font-semibold w-fit py-1 px-8 rounded-md mt-1"
          >
            Cari
          </button>
        </form>
    </div>
  </section>
</template>
