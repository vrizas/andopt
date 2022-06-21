<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import axios from 'axios'
import DashboardTab from '../../../components/desktop/spv/panel-tabs/DashboardTab.vue'
import AdminListTab from '../../../components/desktop/spv/panel-tabs/AdminListTab.vue'
import CreateAdminTab from '../../../components/desktop/spv/panel-tabs/CreateAdminTab.vue'
import SettingsTab from '../../../components/desktop/spv/panel-tabs/SettingsTab.vue'
import CONFIG from '../../../config'

const route = useRoute()
const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  if (user) {
    axios.get(`${CONFIG.API_BASE_URL}/user/${user.uid}`).then(res => {
      if (res.data.user.role !== 'spv') {
        window.location = '/#/login'
      }
    })
  } else {
    window.location = '/#/login'
  }
})

const showIndicator = () => {
  return !route.params.tab || (route.params.tab === 'admin' && route.params.secTab === 'list') || route.params.tab === 'settings'
}
</script>

<template>
  <div>
    <aside class="fixed top-0 left-0 z-[998] w-[250px] h-screen">
      <nav class="bg-soft-black text-lightGray h-full py-20">
        <div class="relative flex flex-col text-sm">
          <RouterLink to="/spv" class="relative flex items-center gap-3 px-3 py-2 font-medium" :class="{active:!route.params.tab}">
            <span
              class="w-8 h-8 rounded-full bg-darkGray text-white flex items-center justify-center text-sm"
              ><font-awesome-icon icon="gauge"
            /></span>
            <span>Dashboard</span>
          </RouterLink>
          <RouterLink to="/spv/admin/list" class="relative flex items-center gap-3 px-3 py-2 font-medium" :class="{active:route.params.tab==='admin'&&route.params.secTab==='list'}">
            <span
              class="w-8 h-8 rounded-full bg-darkGray text-white flex items-center justify-center text-sm"
              ><font-awesome-icon icon="people-group"
            /></span>
            <span>Daftar Admin</span>
          </RouterLink>
          <RouterLink to="/spv/settings" class="relative flex items-center gap-3 px-3 py-2 font-medium" :class="{active:route.params.tab==='settings'}">
            <span
              class="w-8 h-8 rounded-full bg-darkGray text-white flex items-center justify-center text-sm"
            >
              <font-awesome-icon icon="user-gear" />
            </span>
            <span>Pengaturan</span>
          </RouterLink>
          <div class="indicator" v-show="showIndicator()"></div>
        </div>
        <div class="px-3">
            <button class="text-lightGray text-sm border border-secondary rounded-md py-1 px-8 font-semibold mt-10 active:bg-secondary active:text-white hover:bg-secondary hover:text-white" @click="signOutHandler">
            Keluar
          </button>
        </div>
      </nav>
    </aside>
    <main class="ml-[250px]">
      <DashboardTab v-if="!route.params.tab" />
      <AdminListTab v-else-if="route.params.tab==='admin'&&route.params.secTab==='list'" />
      <CreateAdminTab v-else-if="route.params.tab==='admin'&&route.params.secTab==='create'" />
      <SettingsTab v-else-if="route.params.tab==='settings'" />
    </main>
  </div>
</template>

<style scoped>
nav .indicator {
  width: 100%;
  height: calc(100% / 3);
  background-color: #E06B2D;
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
  color: #23282D;
}
nav a:nth-child(1).active ~ .indicator {
  transform: translateY(calc(100% / 3 * 0));
}

nav a:nth-child(2).active ~ .indicator {
  transform: translateY(calc(100% / 3 * 3));
}

nav a:nth-child(3).active ~ .indicator {
  transform: translateY(calc(100% / 3 * 6));
}
</style>
