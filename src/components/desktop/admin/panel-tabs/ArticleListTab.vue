<script setup>
import { ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import axios from 'axios'
import CONFIG from '../../../../config'

const articles = ref([])
const auth = getAuth()
const user = ref(null)

onAuthStateChanged(auth, (account) => {
  if (account) {
    user.value = account
    axios.get(`${CONFIG.API_BASE_URL}/articles`).then(res => {
      articles.value = res.data.articles.filter(article => article.user_uid === user.value.uid)
    })
  } else {
    user.value = null
  }
})

const deleteUploadedArticleHandler = (articleId) => {
  const userConfirm = confirm('Apakah anda yakin ingin menghapus artikel ini?')
  if (userConfirm) {
    user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
      axios.delete(`${CONFIG.API_BASE_URL}/article/${articleId}`, {
        headers: {
          'X-Firebase-Token': idToken
        }
      }).then(res => {
        articles.value = articles.value.filter(article => article.id !== articleId)
      })
    })
  }
}
</script>

<template>
    <section class="py-8 px-10">
        <h2 class="text-lg mb-8 font-semibold">Artikel Saya</h2>
        <div class="grid grid-cols-3 gap-5">
            <div class="h-[450px] rounded-lg shadow-andopt" v-for="article in articles" :key="article.id">
                <div class="relative h-3/6">
                    <img
                    :src="article.imageUrl"
                    :alt="article.title"
                    class="w-full h-full object-cover rounded-t-lg"
                    draggable="false"
                    />
                    <div class="flex gap-2 absolute top-2 right-2">
                        <button class="trashButton w-7 h-7 rounded-full bg-white text-lightGray flex justify-center items-center" @click="deleteUploadedArticleHandler(article.id)">
                            <font-awesome-icon icon="trash" class="icon" />
                        </button>
                    </div>
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
        </div>
    </section>
</template>
