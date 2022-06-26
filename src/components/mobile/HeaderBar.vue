<script setup>
import { ref } from 'vue'
import SearchBarPopup from './popup/SearchBarPopup.vue'
import ChatPopup from './popup/ChatPopup.vue'

defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false
  },
  queryInput: {
    type: String,
    default: ''
  },
  locInput: {
    type: String,
    default: ''
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
  },
  showChatRoom: {
    type: Boolean,
    default: false
  }
})

const openSearchBar = ref(false)

const showSearchBarPopup = () => {
  openSearchBar.value = true
}

const closeSearchBarPopup = () => {
  openSearchBar.value = false
}
</script>

<template>
    <div class="sticky top-0 z-50">
        <header class="px-3 py-2 flex justify-between bg-primary max-w-[600px]" v-if="isLoggedIn">
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
        <SearchBarPopup v-if="openSearchBar" :closeHandler="closeSearchBarPopup" :query="queryInput" :loc="locInput" />
        <ChatPopup :closeChatHandler="closeChatHandler" :chatReceiverUid="chatReceiverUid" :chatPetId="chatPetId" :showChatRoom="showChatRoom" v-if="openChat && isLoggedIn" />
        <header class="px-3 py-2 gap-6 flex justify-between bg-primary max-w-[600px]" v-else-if="!isLoggedIn">
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
