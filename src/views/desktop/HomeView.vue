<script setup>
import { ref } from 'vue';
import AutoCompleteList from '../../components/desktop/AutoCompleteList.vue';

const cityInput = ref(null);
const autoCompleteList = ref(null);
const autoCompleteListVisible = ref(false);
const cities = ref([
  'Jakarta',
  'Bandung',
  'Surabaya',
  'Bogor',
  'Tangerang',
  'Depok',
  'Bekasi',
]);
const filteredCities = ref([]);

const autoCompleteHandler = (e) => {
  const userData = e.target.value;
  if (userData) {
    filteredCities.value = cities.value.filter((city) => city.toLowerCase().startsWith(userData.toLowerCase()));

    autoCompleteListVisible.value = true;
  } else {
    autoCompleteListVisible.value = false;
  }
};

const useAutocomplete = (e) => {
  const choosenCity = e.target.innerText.replace(/\s/g, '');
  cityInput.value.value = choosenCity;
  autoCompleteListVisible.value = false;
};

</script>

<template>
  <main>
    <section class="relative h-[40vh] text-white">
      <img src="../../assets/img/hero.jpg" alt="" class="h-full w-full object-cover">
      <div class="absolute top-0 left-0 h-full w-full bg-darkFilter"></div>
      <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center gap-4">
        <h2 class="font-montserrat text-4xl font-bold">Get your bestie</h2>
        <form class="text-black w-[75vw] flex gap-3" @submit.prevent="">
          <div class="relative w-full">
            <input type="search" class="py-2 pl-10 pr-3 w-full text-sm rounded focus:outline-0" placeholder="Masukkan jenis peliharaan">
            <span class="absolute top-0 left-0 h-full w-10 flex items-center justify-center text-darkGray"><font-awesome-icon icon="magnifying-glass" /></span>
          </div>
          <div class="relative w-full">
            <input type="search" class="py-2 pl-10 pr-3 w-full text-sm rounded focus:outline-0" placeholder="Masukkan kota" ref="cityInput" @keyup="autoCompleteHandler">
            <span class="absolute top-0 left-0 h-full w-10 flex items-center justify-center text-darkGray"><font-awesome-icon icon="location-dot" /></span>
            <AutoCompleteList :cities="filteredCities" :clickHandler="useAutocomplete" v-show="autoCompleteListVisible" ref="autoCompleteList" />
          </div>
          <button class="bg-primary text-white text-sm font-semibold w-1/5 rounded">Cari</button>
        </form>
      </div>
    </section>
  </main>
</template>
