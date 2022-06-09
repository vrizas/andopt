<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore'
import axios from 'axios'
import MessageItem from '../MessageItem.vue'

const messages = ref([])
const message = ref('')
const messageInput = ref(null)
const auth = getAuth()
const user = ref(null)
const db = getFirestore()
const messagesCollection = collection(db, 'messages')

onAuthStateChanged(auth, (account) => {
  if (account) {
    user.value = account
    const unsubscribe = onSnapshot(messagesCollection, snapshot => {
      messages.value = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .reverse()
    })

    onUnmounted(unsubscribe)
  } else {
    user.value = null
  }
})

const sendMessageHandler = async () => {
  if (!user.value) return
  const { uid } = user.value

  try {
    await addDoc(messagesCollection, {
      sender_uid: uid,
      text: message.value,
      createdAt: new Date()
    })

    message.value = ''
    messageInput.value.focus()
  } catch (error) {
    console.error(error)
  }
}

</script>

<template>
    <div class="chat fixed bottom-5 right-5 shadow-andopt rounded-md flex w-1/3 h-2/4 bg-white text-sm">
        <aside class="w-1/3">
            <button class="flex items-center px-3 py-2 bg-primaryFilter rounded-l-md rounded-bl-none w-full text-left">
                <img
                src="../../../assets/images/default-profile-pic.png"
                class="rounded-full w-7 h-7 mr-3"
                alt="Avatar"
                />
                <div>
                    <p class="font-semibold truncate">vrizass</p>
                    <p class="text-xs text-gray-600">Online</p>
                </div>
            </button>
            <button class="flex items-center px-3 py-2 w-full text-left">
                <img
                src="../../../assets/images/default-profile-pic.png"
                class="rounded-full w-7 h-7 mr-3"
                alt="Avatar"
                />
                <div>
                    <p class="font-semibold">Andi</p>
                    <p class="text-xs text-gray-600">Online</p>
                </div>
            </button>
            <button class="flex items-center px-3 py-2 w-full text-left">
                <img
                src="../../../assets/images/default-profile-pic.png"
                class="rounded-full w-7 h-7 mr-3"
                alt="Avatar"
                />
                <div>
                    <p class="font-semibold">Andi</p>
                    <p class="text-xs text-gray-600">Online</p>
                </div>
            </button>
        </aside>
        <section class="grid grid-rows-chat border-l border-darkGray w-2/3 h-full">
            <div class="flex justify-between items-center px-3 py-2 rounded-r-md rounded-br-none bg-primary text-white">
                <div class="flex gap-2 items-center">
                    <img
                    src="../../../assets/images/default-profile-pic.png"
                    class="rounded-full w-6 h-6"
                    alt="Avatar"
                    />
                    <p class="font-medium">Andi</p>
                </div>
                <button class="text-lg">
                    <font-awesome-icon icon="times" />
                </button>
            </div>
            <div class="overflow-y-auto p-4">
                <MessageItem :isSender="!(sender_uid === user.uid)" :message="message.text" :createdAt="message.createdAt.toDate()" v-for="message in messages" :key="message.id" />
            </div>
            <form class="relative w-full" @submit.prevent="sendMessageHandler">
                <input type="text" class="w-full border-t border-darkGray py-3 pl-3 pr-10 focus:outline-0" v-model="message" ref="messageInput">
                <button class="absolute h-full text-lg right-4">
                    <font-awesome-icon icon="paper-plane" />
                </button>
            </form>
        </section>
    </div>
</template>

<style scoped></style>
