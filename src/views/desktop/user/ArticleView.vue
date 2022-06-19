<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import axios from 'axios'
import CONFIG from '../../../config'

const route = useRoute()
const article = ref(null)

axios.get(`http://localhost:4000/article/${route.params.id}`).then(res => {
  article.value = res.data.article
})
</script>

<template>
  <main class="py-8 px-10 flex flex-col bg-white min-h-[80vh]">
    <h2 class="font-semibold mb-1 text-xl">{{article?.title}}</h2>
    <p class="font-medium text-darkGray mb-4">{{article?.category}}</p>
    <img :src="article?.imageUrl" :alt="article?.title" class="h-[75vh] object-cover rounded-lg">
    <p class="mt-5 text-sm" v-html="article?.content"></p>
  </main>
</template>
