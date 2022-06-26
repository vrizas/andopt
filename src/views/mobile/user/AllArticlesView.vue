<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import axios from 'axios'
import CONFIG from '../../../config'
import HeaderBar from '../../../components/mobile/HeaderBar.vue'

defineProps({
  openChat: {
    type: Boolean,
    default: false
  },
  openChatHandler: {
    type: Function
  },
  closeChatHandler: {
    type: Function
  },
  chatReceiverUid: {
    type: String
  },
  chatPetId: {
    type: String
  }
})

const articles = ref([])
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

axios.get(`${CONFIG.API_BASE_URL}/articles`).then(res => {
  res.data.articles.forEach((article) => {
    articles.value.push(article)
  })
})

</script>

<template>
  <div>
    <HeaderBar :isLoggedIn="isLoggedIn" :openChat="openChat" :openChatHandler="openChatHandler" :closeChatHandler="closeChatHandler" :chatReceiverUid="chatReceiverUid" :chatPetId="chatPetId" />
    <main class="bg-white pt-5 pb-24 px-4">
      <h3 class="font-semibold text-darkGray mb-4">Artikel Terbaru</h3>
      <section class="grid grid-cols-1 gap-3">
        <div class="h-[380px] rounded-lg shadow-andopt" v-for="article in articles" :key="article.id">
          <div class="h-3/6">
            <img
              :src="article.imageUrl"
              :alt="article.title"
              class="w-full h-full object-cover rounded-t-lg"
              draggable="false"
            />
          </div>
          <div class="relative py-3 px-4 h-3/6">
            <h4 class="text-sm font-semibold truncate">{{article.title}}</h4>
            <p class="text-xs font-medium text-darkGray">{{article.category}}</p>
            <p class="text-xs text-ellipsis overflow-hidden mt-2" v-html="article.content"></p>
            <RouterLink :to="'/article/'+article.id" class="absolute bottom-5 text-xs text-primary inline-block">
              Baca Selengkapnya
            </RouterLink>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
