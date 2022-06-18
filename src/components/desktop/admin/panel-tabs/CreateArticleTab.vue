<script setup>
import { ref } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
import { nanoid } from 'nanoid'
import CONFIG from '../../../../config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

const title = ref('')
const content = ref('')
const type = ref('')
const newArticlePhoto = ref(null)
const flashMessage = ref('')
const isUploaded = ref(false)
const storage = getStorage()
const auth = getAuth()
const user = ref(null)

onAuthStateChanged(auth, (account) => {
  if (account) {
    user.value = account
  } else {
    user.value = null
    window.location.href = '/#/login'
  }
})

const uploadImageAsPromise = (file, isTemp = true, articleId) => {
  return new Promise((resolve, reject) => {
    let storageImageRef = null
    if (isTemp) {
      storageImageRef = storageRef(storage, `images/articles/article-${user.value.uid}(temp)`)
    } else {
      storageImageRef = storageRef(storage, `images/articles/${articleId}/article-${user.value.uid}`)
    }

    const uploadTask = uploadBytesResumable(storageImageRef, file)

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        flashMessage.value = 'Proses unggah sedang berlangsung...'
      },
      (error) => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          flashMessage.value = ''
          resolve(downloadURL)
        })
      }
    )
  })
}

const deleteImageAsPromise = () => {
  return new Promise((resolve, reject) => {
    const storageImageRef = storageRef(storage, `images/articles/article-${user.value.uid}(temp)`)
    deleteObject(storageImageRef).then(() => {
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}

const onFileChange = async (e) => {
  newArticlePhoto.value = e.target.files[0]
  uploadImageAsPromise(newArticlePhoto.value)

  isUploaded.value = true
}

const submitHandler = () => {
  if (title.value && content.value && isUploaded.value) {
    flashMessage.value = 'Proses sedang berlangsung...'
  } else {
    alert('Data tidak lengkap')
  }

  user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
    const articleId = nanoid()
    const imageUrl = await uploadImageAsPromise(newArticlePhoto.value, false, articleId)
    await deleteImageAsPromise()
    const article = {
      id: articleId,
      title: title.value,
      content: content.value,
      type: type.value,
      imageUrl
    }

    const config = {
      headers: {
        'X-Firebase-Token': idToken
      }
    }

    await axios.post(`http://localhost:4000/admin/${user.value.uid}/articles`, article, config)
    flashMessage.value = ''
    title.value = ''
    content.value = ''
    type.value = ''
    newArticlePhoto.value = null
    isUploaded.value = false
  }).catch(function (error) {
    alert(error)
  })
}
</script>

<template>
    <form class="py-8 px-10" @submit.prevent="submitHandler">
        <h2 class="text-lg mb-8 font-semibold">Buat Artikel</h2>
        <div class="flex flex-col gap-3 text-sm w-full">
            <div class="flex gap-10">
                <label for="petImages" class="w-[250px] h-[250px] border border-dashed border-darkGray rounded-lg text-darkGray text-2xl flex items-center justify-center" v-if="!isUploaded">
                    <input type="file" id="petImages" class="hidden" @change="onFileChange" accept="image/*" required>
                    <font-awesome-icon icon="file-circle-plus" />
                </label>
                <label for="petImages" class="w-[250px] h-[250px] border border-dashed border-secondary rounded-lg text-darkGray text-2xl flex items-center justify-center" v-else>
                    <input type="file" id="petImages" class="hidden" @change="onFileChange" accept="image/*">
                    <font-awesome-icon icon="images" class="text-secondary" />
                </label>
                <div class="flex flex-col gap-3 w-1/2">
                    <div class="flex flex-col gap-1 w-full">
                        <label for="title">Judul Artikel</label>
                        <input
                            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
                            type="title"
                            v-model="title"
                            id="title"
                            required
                        />
                    </div>
                    <div class="flex flex-col gap-1 w-full">
                        <label for="title">Tipe Artikel</label>
                        <input
                            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
                            type="type"
                            v-model="type"
                            id="type"
                            required
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <Editor :init="{
                    plugins: 'lists link image table code help wordcount'
                }" v-model="content" rows="25" />
            </div>
            <button class="bg-primary text-white px-10 py-3 w-fit rounded-md font-semibold mt-12">
                Publikasi
            </button>
        </div>
        <div class="fixed bottom-[30px] bg-secondary text-white px-5 py-2 text-sm rounded-md" v-show="flashMessage.length > 0">
        <p>{{ flashMessage }}</p>
        </div>
    </form>
</template>
