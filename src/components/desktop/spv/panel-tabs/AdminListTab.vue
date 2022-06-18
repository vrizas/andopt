<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import CONFIG from '../../../../config'

const admins = ref([])

axios.get('http://localhost:4000/admins').then(res => {
  admins.value = res.data.admins
})
</script>

<template>
    <section class="py-8 px-10">
        <div class="flex justify-between mb-8">
            <h2 class="font-semibold text-lg">Daftar Admin</h2>
            <RouterLink to="/spv/admin/create" class="text-2xl">
                <font-awesome-icon icon="circle-plus" />
            </RouterLink>
        </div>
        <table class="table-auto w-full text-left">
            <thead class="bg-lightGray">
                <tr>
                    <th class="py-4 px-5 h-full">
                        <input type="checkbox" class="w-5 h-5 rounded">
                    </th>
                    <th class="py-4 px-5 font-semibold">Nama</th>
                    <th class="py-4 px-5 font-semibold">Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="admin in admins" :key="admin.uid">
                    <td class="py-4 px-5 h-full">
                        <input type="checkbox" class="w-4 h-4 rounded">
                    </td>
                    <td class="py-4 px-5">{{admin.username}}</td>
                    <td class="py-4 px-5">{{admin.email}}</td>
                </tr>
            </tbody>
        </table>
        <!-- <button class="font-semibold text-darkGray mt-3">Hapus</button> -->
    </section>
</template>

<style scoped>
    tr:nth-child(even) {
        background-color: #e5e5e5;
    }
</style>
