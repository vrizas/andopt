<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const pets = ref([])
const petGenders = ref([])

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  if (user) {
    axios.get('http://localhost:4000/pets').then(res => {
      pets.value = res.data.pets.filter(pet => pet.user_uid === user.uid)
      pets.value.forEach(pet => {
        if (pet.gender === 'Jantan') {
          petGenders.value.push('mars')
        } else if (pet.gender === 'Betina') {
          petGenders.value.push('venus')
        }
      })
    })
  }
})

</script>

<template>
    <section class="shadow-andopt py-8 px-10 rounded-md">
        <h2 class="text-primary text-lg font-semibold mb-8">Favorit Saya</h2>
    </section>
</template>
