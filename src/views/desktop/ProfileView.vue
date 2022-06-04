<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="py-8 px-10 flex gap-5">
    <aside class="shadow-andopt py-8 px-10 w-1/4 h-fit rounded-md">
      <h2 class="mb-5 font-semibold">Dashboard</h2>
      <nav class="flex flex-col gap-3 text-sm">
        <RouterLink to="/my/favorites" class="flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-full bg-pink text-white flex items-center justify-center text-sm"
            ><font-awesome-icon icon="heart"
          /></span>
          <span>Favorite</span>
        </RouterLink>
        <RouterLink to="/my/lastseen" class="flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm"
          >
            <font-awesome-icon icon="clock" />
          </span>
          <span>Last Seen</span>
        </RouterLink>
        <RouterLink to="/my/upload" class="flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-sm"
          >
            <font-awesome-icon icon="paw" />
          </span>
          <span>Upload</span>
        </RouterLink>
        <RouterLink to="/my" class="flex items-center gap-3">
          <span
            class="w-8 h-8 rounded-full bg-darkGray text-white flex items-center justify-center text-sm"
          >
            <font-awesome-icon icon="user-gear" />
          </span>
          <span>Settings</span>
        </RouterLink>
        <div class="text-left">
          <button
            class="text-pink border-2 border-pink rounded-md py-2 px-8 font-semibold mt-10 active:bg-pink active:text-white hover:bg-pink hover:text-white"
          >
            Keluar
          </button>
        </div>
      </nav>
    </aside>
    <section class="shadow-andopt w-full py-8 px-10 rounded-md">
      <h2 class="text-primary text-lg font-semibold mb-8">Edit Profile</h2>
      <div class="flex gap-12 ml-6">
        <div>
          <span
            class="flex justify-center items-center bg-[#eeeeee] text-7xl text-secondary rounded-full w-40 h-40"
          >
            <font-awesome-icon icon="paw" />
          </span>
        </div>
        <form class="flex flex-col gap-3 text-sm w-3/5">
          <div class="flex flex-col gap-1">
            <label for="username">Username</label>
            <input
              class="py-3 px-4 border-b-2 border-primary"
              type="text"
              id="username"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="email">Email</label>
            <input
              class="py-3 px-4 border-b-2 border-primary"
              type="email"
              id="email"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="password">Password</label>
            <input
              class="py-3 px-4 border-b-2 border-primary"
              type="password"
              id="password"
            />
          </div>
          <div class="w-full text-left">
            <button
              class="bg-primary text-white px-3 py-2 w-1/5 rounded-md font-semibold mt-4"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<style></style>
