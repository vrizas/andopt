<script setup>
defineProps({
  cities: {
    type: Array,
    required: true,
  },
  clickHandler: {
    type: Function,
    required: true,
  },
});
</script>

<template>
    <ul class="absolute bg-white text-black w-full text-sm shadow-andopt rounded-b" v-if="cities.length > 0">
        <li class="h-10 hover:bg-primaryFilter" v-for="city in cities" :key="city">
            <button class="w-full h-full text-left mx-4" @click.prevent="clickHandler">
                <font-awesome-icon icon="location-dot" class="text-darkGray text-xs mr-1" />
                {{city}}
            </button>
        </li>
    </ul>
    <ul class="absolute bg-white text-black w-full text-sm shadow-andopt rounded-b" v-else>
        <li class="h-10">
            <button class="w-full h-full text-left mx-4" disabled>
                Tidak ada hasil
            </button>
        </li>
    </ul>
</template>
