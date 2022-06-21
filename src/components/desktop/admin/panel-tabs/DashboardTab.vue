<script setup>
import { ref } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import axios from 'axios'
import CONFIG from '../../../../config'

const auth = getAuth()
const user = ref(null)

onAuthStateChanged(auth, (account) => {
  if (account) {
    user.value = account
  } else {
    user.value = null
  }
})

const users = ref([])

axios.get(`${CONFIG.API_BASE_URL}/users`).then(res => {
  users.value = res.data.users
})
</script>

<template>
    <section class="py-8 px-10">
        <h2 class="text-lg mb-8">Hai <span class="font-semibold">{{user?.displayName}}</span>!</h2>
        <div class="grid grid-cols-3">
            <RouterLink to="/admin/user/list">
                <div class="bg-primary text-white flex justify-between items-center py-3 px-4">
                    <font-awesome-icon icon="people-group" class="text-7xl text-white opacity-50"/>
                    <div class="flex flex-col items-end justify-center">
                        <span class="text-4xl font-medium">{{users?.length}}</span>
                        <span class="text-sm">Pengguna</span>
                    </div>
                </div>
                <p class="border border-primary py-2 px-4 text-sm flex justify-between items-center text-primary font-medium">
                    Lihat Detail
                    <font-awesome-icon icon="circle-arrow-right" />
                </p>
            </RouterLink>
        </div>

    </section>
</template>
