<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import axios from 'axios'
import CONFIG from '../../../config'
import HeaderBar from '../../../components/mobile/HeaderBar.vue'

const route = useRoute()
const article = ref(null)
const auth = getAuth()
const user = ref(null)
const isLoggedIn = ref(false)

onAuthStateChanged(auth, (account) => {
  if (account) {
    user.value = account
    isLoggedIn.value = true
  } else {
    user.value = null
    isLoggedIn.value = false
  }
})

axios.get(`${CONFIG.API_BASE_URL}/article/${route.params.id}`).then(res => {
  article.value = res.data.article
})
</script>

<template>
    <div>
        <HeaderBar :isLoggedIn="isLoggedIn" />
        <main class="pt-5 pb-24 px-4 flex flex-col bg-white min-h-[80vh]">
            <h2 class="font-semibold mb-1 text-xl">{{article?.title}}</h2>
            <p class="font-medium text-darkGray mb-4">{{article?.category}}</p>
            <img :src="article?.imageUrl" :alt="article?.title" class="h-[30vh] object-cover rounded-lg">
            <p class="mt-5 text-sm" v-html="article?.content"></p>
        </main>
    </div>
</template>
