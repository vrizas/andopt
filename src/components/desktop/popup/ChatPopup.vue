<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import gsap from 'gsap'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore'
import axios from 'axios'
import MessageItem from '../MessageItem.vue'
import skeleton from '../../../assets/images/skeleton.jpg'

const props = defineProps({
  closeChatHandler: {
    type: Function,
    default: () => {}
  },
  chatReceiverUid: {
    type: String,
    default: ''
  },
  chatPetId: {
    type: String,
    default: ''
  }
})

const chatPopup = ref(null)
const messages = ref([])
const chatRooms = ref([])
const memberChatRooms = ref([])
const currentChatRoom = ref(null)
const message = ref('')
const messageInput = ref(null)
const auth = getAuth()
const user = ref(null)
const db = getFirestore()
const messagesCollection = collection(db, 'messages')
const chatRoomsCollection = collection(db, 'chat_rooms')
const bottom = ref(null)
watch(
  messages,
  () => {
    nextTick(() => {
      bottom.value?.scrollIntoView({ behavior: 'smooth' })
    })
  },
  { deep: true }
)

onAuthStateChanged(auth, (account) => {
  if (account) {
    user.value = account

    let messageUnsub = null
    let memberChatRoomsUnsub = null

    const chatRoomsUnsub = onSnapshot(chatRoomsCollection, (snapshot) => {
      const chatRoomsTemp = []
      let chatRoomExist = false
      let currentChatRoomId = ''
      snapshot.forEach((doc) => {
        if (doc.data().members) {
          if (doc.data().members.includes(account.uid)) {
            chatRoomsTemp.push({
              id: doc.id,
              ...doc.data()
            })
          }

          if (doc.data().members.includes(props.chatReceiverUid)) {
            chatRoomExist = true
            currentChatRoomId = doc.id
          }
        }
      })
      chatRoomsTemp.sort((a, b) => {
        return b.createdAt - a.createdAt
      })
      chatRooms.value = chatRoomsTemp

      const memberChatRoomsTemp = []
      memberChatRoomsUnsub = onSnapshot(collection(db, 'users'), (snapshot) => {
        const receiversUid = []
        chatRooms.value.forEach((chatRoom) => {
          chatRoom.members.forEach((member) => {
            if (member !== account.uid) {
              receiversUid.push(member)
            }
          })
        })
        snapshot.forEach((doc) => {
          if (receiversUid.includes(doc.id)) {
            memberChatRoomsTemp.push({
              id: doc.id,
              ...doc.data()
            })
          }
        })

        memberChatRooms.value = memberChatRoomsTemp
        console.log(chatRoomExist)
        if (chatRoomExist) {
          currentChatRoom.value = {
            id: currentChatRoomId,
            member: memberChatRooms.value.find(member => member.id === props.chatReceiverUid)
          }
        } else {
          currentChatRoom.value = {
            id: chatRooms.value[0].id,
            member: memberChatRooms.value[0]
          }
        }
      })

      messageUnsub = onSnapshot(messagesCollection, snapshot => {
        let messagesTemp = []
        let shouldSkip = false
        snapshot.forEach((doc) => {
          if (shouldSkip) {
            return
          }

          if (doc.data().chat_room_id === currentChatRoom.value.id) {
            messagesTemp = doc.data().messages
            shouldSkip = true
          }
        })
        messagesTemp.sort((a, b) => {
          return a.createdAt - b.createdAt
        })
        messages.value = messagesTemp
      })
    })

    onUnmounted(chatRoomsUnsub, messageUnsub, memberChatRoomsUnsub)
  } else {
    user.value = null
  }
})

const sendMessageHandler = async () => {
  if (!user.value) return
  const { uid } = user.value

  try {
    const messagesLength = messages.value.length
    let chatRoomExist = false

    chatRooms.value.forEach(chatRoom => {
      if (chatRoom.members.includes(uid) && chatRoom.members.includes(currentChatRoom.value.member.id)) {
        chatRoomExist = true
      }
    })

    let chatRoomResult = null

    if (!chatRoomExist) {
      chatRoomResult = await addDoc(chatRoomsCollection, {
        members: [
          uid,
          currentChatRoom.value.member.id
        ],
        createdAt: new Date()
      })
    } else {
      chatRoomResult = chatRooms.value[0]
    }

    let messageIdExist = false
    let messageId = null
    const messageSnap = await getDocs(messagesCollection)
    let shouldSkip = false
    messageSnap.forEach(doc => {
      if (shouldSkip) {
        return
      }
      if (doc.data().chat_room_id === chatRoomResult.id) {
        messageIdExist = true
        messageId = doc.id
        shouldSkip = true
      }
    })
    if (messageIdExist) {
      await updateDoc(doc(db, 'messages', messageId), {
        messages: arrayUnion({
          sender_uid: uid,
          text: message.value,
          createdAt: new Date()
        })
      })
    } else {
      await addDoc(messagesCollection, {
        chat_room_id: chatRoomResult.id,
        messages: [{
          sender_uid: uid,
          text: message.value,
          createdAt: new Date()
        }]
      })
    }

    message.value = ''
    messageInput.value.focus()
  } catch (error) {
    console.error(error)
  }
}

const changeCurrentChatRoomHandler = (chatRoomId) => {
  const member = chatRooms.value.find(chatRoom => {
    if (chatRoom.id === chatRoomId) {
      return chatRoom.members.find(member => member !== user.value.uid)
    }
    return null
  })
  if (member) {
    currentChatRoom.value = {
      id: chatRoomId,
      member: memberChatRooms.value.find(memberChatRoom => memberChatRoom.id === member.id)
    }
  }
}

onMounted(() => {
  if (props.chatPetId) {
    axios.get(`http://localhost:4000/pet/${props.chatPetId}`)
      .then(({ data }) => {
        message.value = `Halo saya ingin bertanya, apakah boleh saya mengadopsi ${data.pet.name}?`
      })
      .catch(error => {
        console.error(error)
      })
  }

  gsap.to(chatPopup.value, {
    duration: 0.5,
    y: 0,
    ease: 'power3'
  })
  messageInput.value.focus()
})

</script>

<template>
    <div class="chat fixed bottom-5 right-5 shadow-andopt rounded-md flex w-1/3 h-2/4 bg-white text-sm translate-y-full" ref="chatPopup">
        <aside class="w-1/3">
            <button class="flex items-center px-3 py-2 rounded-l-md rounded-bl-none w-full text-left" :class="{'bg-primaryFilter':currentChatRoom.member===memberChatRooms[index]}" v-for="(member, index) in memberChatRooms" :key="member.id" @click="changeCurrentChatRoomHandler">
                <img
                :src="member.photoURL"
                class="rounded-full w-7 h-7 mr-3"
                :alt="member.username"
                />
                <div>
                    <p class="font-semibold truncate">{{member.username}}</p>
                    <!-- <p class="text-xs text-gray-600">Online</p> -->
                </div>
            </button>
        </aside>
        <section class="grid grid-rows-chat shadow-andopt w-2/3 h-full">
            <div class="flex justify-between items-center px-3 py-2 rounded-r-md rounded-br-none bg-primary text-white">
                <div class="flex gap-2 items-center">
                    <img
                    :src="currentChatRoom?.member.photoURL || skeleton"
                    class="rounded-full w-6 h-6"
                    :alt="currentChatRoom?.member.username || ''"
                    />
                    <p class="font-medium">{{currentChatRoom?.member.username||''}}</p>
                </div>
                <button class="text-lg" @click="closeChatHandler">
                    <font-awesome-icon icon="times" />
                </button>
            </div>
            <div class="flex flex-col gap-2 overflow-y-auto p-4 text-xs">
                <MessageItem :isSender="message.sender_uid === user?.uid" :message="message.text" :createdAt="message.createdAt.toDate()" v-for="message in messages" :key="message.id" />
                <div ref="bottom" />
            </div>
            <form class="relative w-full" @submit.prevent="sendMessageHandler">
                <textarea name="message" id="message" cols="30" rows="2" class="w-full border-t border-darkGray text-xs py-3 pl-3 pr-10 focus:outline-0" v-model="message" ref="messageInput">
                </textarea>
                <button class="absolute h-full text-lg right-4">
                    <font-awesome-icon icon="paper-plane" />
                </button>
            </form>
        </section>
    </div>
</template>

<style scoped></style>
