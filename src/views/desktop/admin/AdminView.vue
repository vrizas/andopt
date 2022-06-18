<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import axios from 'axios'
import DashboardTab from '../../../components/desktop/admin/panel-tabs/DashboardTab.vue'
import UserListTab from '../../../components/desktop/admin/panel-tabs/UserListTab.vue'
import SettingsTab from '../../../components/desktop/admin/panel-tabs/SettingsTab.vue'
import CONFIG from '../../../config'
import CreateArticleTab from '../../../components/desktop/admin/panel-tabs/CreateArticleTab.vue'

const route = useRoute()
const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  if (user) {
    axios.get(`${CONFIG.API_BASE_URL}/user/${user.uid}`).then(res => {
      if (res.data.user.role !== 'admin') {
        window.location = '/#/login'
      }
    })
  } else {
    window.location = '/#/login'
  }
})

const showIndicator = () => {
  return !route.params.tab || (route.params.tab === 'user' && route.params.secTab === 'list') || (route.params.tab === 'article' && route.params.secTab === 'create') || route.params.tab === 'settings'
}
</script>

<template>
  <div>
    <aside class="fixed top-0 left-0 z-[998] w-[250px] h-screen">
      <nav class="bg-secondary text-white h-full py-20">
        <div class="relative flex flex-col text-sm">
          <RouterLink to="/admin" class="relative flex items-center gap-3 px-3 py-2 font-medium" :class="{active:!route.params.tab}">
            <span
              class="w-8 h-8 rounded-full bg-white text-secondary flex items-center justify-center text-sm"
              ><font-awesome-icon icon="gauge"
            /></span>
            <span>Dashboard</span>
          </RouterLink>
          <RouterLink to="/admin/user/list" class="relative flex items-center gap-3 px-3 py-2 font-medium" :class="{active:route.params.tab==='user'&&route.params.secTab==='list'}">
            <span
              class="w-8 h-8 rounded-full bg-white text-secondary flex items-center justify-center text-sm"
              ><font-awesome-icon icon="people-group"
            /></span>
            <span>Daftar Pengguna</span>
          </RouterLink>
          <RouterLink to="/admin/article/create" class="relative flex items-center gap-3 px-3 py-2 font-medium" :class="{active:route.params.tab==='article'&&route.params.secTab==='create'}">
            <span
              class="w-8 h-8 rounded-full bg-white text-secondary flex items-center justify-center text-sm"
              ><font-awesome-icon icon="newspaper"
            /></span>
            <span>Buat Artikel</span>
          </RouterLink>
          <RouterLink to="/admin/settings" class="relative flex items-center gap-3 px-3 py-2 font-medium" :class="{active:route.params.tab==='settings'}">
            <span
              class="w-8 h-8 rounded-full bg-white text-secondary flex items-center justify-center text-sm"
            >
              <font-awesome-icon icon="user-gear" />
            </span>
            <span>Pengaturan</span>
          </RouterLink>
          <div class="indicator" v-show="showIndicator()"></div>
        </div>
        <div class="px-3">
            <button class="text-sm rounded-md py-1 px-8 font-semibold mt-10 bg-soft-black text-white" @click="signOutHandler">
            Keluar
          </button>
        </div>
      </nav>
    </aside>
    <main class="ml-[250px]">
      <DashboardTab v-if="!route.params.tab" />
      <UserListTab v-else-if="route.params.tab==='user'&&route.params.secTab==='list'" />
      <CreateArticleTab v-else-if="route.params.tab==='article'&&route.params.secTab==='create'" />
      <SettingsTab v-else-if="route.params.tab==='settings'" />
    </main>
  </div>
</template>

<style scoped>
nav .indicator {
  width: 100%;
  height: calc(100% / 4);
  background-color: #23282D;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.5s;
}

nav a.active {
  z-index: 1;
  color: #F9F9F9;
}
nav a.active span:nth-child(1) {
  background-color: #F9F9F9;
  color: #E06B2D;
}
nav a:nth-child(1).active ~ .indicator {
  transform: translateY(calc(100% / 4 * 0));
}

nav a:nth-child(2).active ~ .indicator {
  transform: translateY(calc(100% / 4 * 4));
}

nav a:nth-child(3).active ~ .indicator {
  transform: translateY(calc(100% / 4 * 8));
}
nav a:nth-child(4).active ~ .indicator {
  transform: translateY(calc(100% / 4 * 12));
}
</style>
