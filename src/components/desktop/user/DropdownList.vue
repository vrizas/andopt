<script setup>
defineProps({
  list: {
    type: Array,
    required: true
  },
  clickHandler: {
    type: Function,
    required: true
  }
})
</script>

<template>
    <ul class="absolute bg-white text-black w-full text-sm shadow-andopt rounded-b">
        <li class="h-10 hover:bg-primaryFilter" v-for="data in list" :key="data">
            <button class="w-full h-full text-left mx-4" @click.prevent="clickHandler">
                {{data}}
            </button>
        </li>
    </ul>
</template>
