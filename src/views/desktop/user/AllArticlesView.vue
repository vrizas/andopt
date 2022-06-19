<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import CONFIG from '../../../config'

const articles = ref([])

axios.get('http://localhost:4000/articles').then(res => {
  res.data.articles.forEach((article) => {
    articles.value.push(article)
  })
})

</script>

<template>
  <main class="bg-white py-6 px-10">
    <h3 class="font-semibold text-lg text-darkGray mb-4">Artikel Terbaru</h3>
    <section class="grid grid-cols-3 gap-5">
        <div class="h-[450px] rounded-lg shadow-andopt" v-for="article in articles" :key="article.id">
            <div class="h-3/6">
            <img
                :src="article.imageUrl"
                :alt="article.title"
                class="w-full h-full object-cover rounded-t-lg"
                draggable="false"
            />
            </div>
            <div class="relative py-3 px-4 h-3/6">
            <h4 class="font-semibold truncate">{{article.title}}</h4>
            <p class="text-sm font-medium text-darkGray">{{article.category}}</p>
            <p class="text-sm text-ellipsis overflow-hidden mt-2" v-html="article.content"></p>
            <RouterLink :to="'/article/'+article.id" class="absolute bottom-5 text-sm text-primary inline-block">
                Baca Selengkapnya
            </RouterLink>
            </div>
        </div>
    </section>
  </main>
</template>
