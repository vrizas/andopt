<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRoute } from 'vue-router'
import ProfileSetting from '../../../components/desktop/profile-tabs/ProfileSetting.vue'
import MyUpload from '../../../components/desktop/profile-tabs/MyUpload.vue'
import MyFavorite from '../../../components/desktop/profile-tabs/MyFavorite.vue'
import LastSeen from '../../../components/desktop/profile-tabs/LastSeen.vue'

const route = useRoute()
const auth = getAuth()

onAuthStateChanged(auth, (account) => {
  if (!account) {
    window.location.href = '/#/login'
  }
})
</script>

<template>
  <main class="py-8 px-10 grid grid-cols-profile gap-5 min-h-[80vh]">
    <aside class="shadow-andopt py-8 px-10 h-fit rounded-md">
      <h2 class="mb-5 font-semibold">Dashboard</h2>
      <nav>
        <div class="relative flex flex-col gap-3 text-sm">
          <RouterLink to="/my/pet/add" class="flex items-center gap-3">
            <span
              class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm"
              ><font-awesome-icon icon="plus"
            /></span>
            <span>Unggah Peliharaan</span>
          </RouterLink>
          <RouterLink to="/my/favorites" class="flex items-center gap-3" :class="{active:route.params.tab==='favorites'}">
            <span
              class="w-8 h-8 rounded-full bg-pink text-white flex items-center justify-center text-sm"
              ><font-awesome-icon icon="heart"
            /></span>
            <span>Favorit Saya</span>
          </RouterLink>
          <RouterLink to="/my/lastseen" class="flex items-center gap-3" :class="{active:route.params.tab==='lastseen'}">
            <span
              class="w-8 h-8 rounded-full bg-darkGray text-white flex items-center justify-center text-sm"
            >
              <font-awesome-icon icon="clock" />
            </span>
            <span>Terakhir Dilihat</span>
          </RouterLink>
          <RouterLink to="/my/upload" class="flex items-center gap-3" :class="{active:route.params.tab==='upload'}">
            <span
              class="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-sm"
            >
              <font-awesome-icon icon="paw" />
            </span>
            <span>Unggahan Saya</span>
          </RouterLink>
          <RouterLink to="/my" class="flex items-center gap-3" :class="{active:!route.params.tab}">
            <span
              class="w-8 h-8 rounded-full bg-darkGray text-white flex items-center justify-center text-sm"
            >
              <font-awesome-icon icon="user-gear" />
            </span>
            <span>Pengaturan</span>
          </RouterLink>
          <font-awesome-icon icon="bookmark" class="indicator text-3xl text-darkGray" />
        </div>
        <button class="text-pink text-sm border-2 border-pink rounded-md py-1 px-8 font-semibold mt-10 active:bg-pink active:text-white hover:bg-pink hover:text-white" @click="signOutHandler">
          Keluar
        </button>
      </nav>
    </aside>
    <ProfileSetting v-if="!route.params.tab" />
    <MyUpload v-else-if="route.params.tab==='upload'" />
    <LastSeen v-else-if="route.params.tab==='lastseen'" />
    <MyFavorite v-else-if="route.params.tab==='favorites'" />
  </main>
</template>

<style scoped>
nav .indicator {
  height: calc(100% / 5);
  position: absolute;
  top: 0;
  right: -35px;
  transition: 0.5s;
}

nav a:nth-child(1).active ~ .indicator {
  transform: rotate(90deg) translateX(calc(100% / 5 * -.5));
}

nav a:nth-child(2).active ~ .indicator {
  transform: rotate(90deg) translateX(calc(100% / 5 * 6));
}

nav a:nth-child(3).active ~ .indicator {
  transform: rotate(90deg) translateX(calc(100% / 5 * 13));
}

nav a:nth-child(4).active ~ .indicator {
  transform: rotate(90deg) translateX(calc(100% / 5 * 20.5));
}

nav a:nth-child(5).active ~ .indicator {
  transform: rotate(90deg) translateX(calc(100% / 5 * 27.5));
}
</style>
