<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SearchBarPopup from './popup/SearchBarPopup.vue'
import ChatPopup from './popup/ChatPopup.vue'

defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  openChat: {
    type: Boolean,
    default: false
  },
  openChatHandler: {
    type: Function
  },
  closeChatHandler: {
    type: Function
  },
  chatReceiverUid: {
    type: String
  },
  chatPetId: {
    type: String
  }
})

const route = useRoute()
const header = ref(null)
const openSearchBar = ref(false)

const showSearchBarPopup = () => {
  openSearchBar.value = true
}

const closeSearchBarPopup = () => {
  openSearchBar.value = false
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (route.name === 'home') {
      if (window.scrollY > 0) {
        header.value?.classList.add('bg-primary')
      } else {
        header.value?.classList.remove('bg-primary')
      }
    }
  })
})
</script>

<template>
    <div class="fixed z-50 top-0 w-full">
        <header class="px-3 py-2 w-full flex justify-between max-w-[600px]" ref="header" v-if="isLoggedIn">
            <div class="relative w-[75%]">
                <button class="w-full" @click="showSearchBarPopup">
                  <input type="search" class="py-2 pl-10 pr-3 w-full text-xs rounded focus:outline-0 bg-white" placeholder="Masukkan jenis peliharaan" disabled/>
                </button>
                <span class="absolute top-0 left-0 h-full w-10 text-sm flex items-center justify-center text-darkGray">
                    <font-awesome-icon icon="magnifying-glass"/>
                </span>
            </div>
            <nav class="flex gap-7 text-lg text-white">
                <!-- <button class="relative">
                    <font-awesome-icon icon="bell" />
                    <span class="absolute top-[2px] right-[-5px] text-[11px] leading-none bg-pink rounded-full h-3 w-3 flex justify-center items-center">1</span>
                </button> -->
                <button class="relative" @click="openChatHandler('', '')">
                    <font-awesome-icon icon="comment-dots" />
                    <!-- <span class="absolute top-[2px] right-[-5px] text-[11px] leading-none bg-pink rounded-full h-3 w-3 flex justify-center items-center">1</span> -->
                </button>
            </nav>
        </header>
        <SearchBarPopup v-if="openSearchBar" :closeHandler="closeSearchBarPopup" />
        <ChatPopup :closeChatHandler="closeChatHandler" :chatReceiverUid="chatReceiverUid" :chatPetId="chatPetId" v-if="openChat && isLoggedIn" />
        <header class="px-3 py-2 w-full gap-6 flex justify-between max-w-[600px]" ref="header" v-else-if="!isLoggedIn">
            <div class="relative w-[75%]">
                <button class="w-full" @click="showSearchBarPopup">
                  <input type="search" class="py-2 pl-10 pr-3 w-full text-xs rounded focus:outline-0 bg-white" placeholder="Masukkan jenis peliharaan" disabled/>
                </button>
                <span class="absolute top-0 left-0 h-full w-10 text-sm flex items-center justify-center text-darkGray">
                    <font-awesome-icon icon="magnifying-glass"/>
                </span>
            </div>
        </header>
    </div>

</template>

<style scoped>
nav a.active {
  color: var(--primary);
}

nav a.active span {
  color: var(--darkGray);
}

nav .indicator {
  width: calc(100% / 4);
  height: 4px;
  background-color: var(--primary);
  position: absolute;
  bottom: 0;
  left: 0;
  transition: 0.5s;
}

nav a:nth-child(1).active ~ .indicator {
  transform: translateX(calc(100% / 4 * 0));
}

nav a:nth-child(2).active ~ .indicator {
  transform: translateX(calc(100% / 4 * 4));
}

nav a:nth-child(3).active ~ .indicator {
  transform: translateX(calc(100% / 4 * 8));
}

nav a:nth-child(4).active ~ .indicator {
  transform: translateX(calc(100% / 4 * 12));
}
</style>
