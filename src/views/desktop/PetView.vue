<script setup>
import { ref, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <main class="py-8 px-10 flex gap-5 bg-white">
    <h2 class="text-black text-xl font-semibold my-5">Unggah Hewan Peliharaan</h2>
    <aside class="flex justify-center items-center bg-lightGray rounded w-60 h-80 w-1/4" >
      <h2 class="text-black font-semibold">Unggah Poto Hewan</h2>
    </aside>
    <section>
      <form class="flex flex-col gap-3 text-sm w-3/4"></form>
      <div class="flex flex-col gap-1">
          <label for="petname">Nama Hewan</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            v-model="petname"
            id="petname"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="petcategory">Kategori Hewan</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            v-model="petcategory"
            id="petcategory"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="pettype">Jenis Hewan</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            v-model="pettype"
            id="pettype"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="petage">Umur Hewan</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            v-model="petage"
            id="petage"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="petgender">Jenis Kelamin</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            v-model="petgender"
            id="petgender"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="petcondition">Kondisi Hewan</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            v-model="petcondition"
            id="petcondition"
            required
          />
        </div>
        <div class="flex flex-col gap-6">
          <label for="petdescription">Deskripsi Hewan</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            v-model="petdescription"
            id="petdescription"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="petloc">Lokasi</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            v-model="petloc"
            id="petloc"
            required
          />
        </div>
    </section>

  </main>
</template>
