<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import gsap from 'gsap'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore'
import axios from 'axios'
import MessageItem from '../../desktop/user/MessageItem.vue'
import skeleton from '../../../assets/images/skeleton.jpg'
import CONFIG from '../../../config'

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
  },
  showChatRoom: {
    type: Boolean,
    default: false
  }
})

const chatPopup = ref(null)
const messages = ref([])
const chatRooms = ref([])
const memberChatRooms = ref([])
const activeMemberId = ref(null)
const activeChatRoomId = ref(null)
const activeMember = ref(null)
const message = ref('')
const messageInput = ref(null)
const auth = getAuth()
const user = ref(null)
const db = getFirestore()
const messagesCollection = collection(db, 'messages')
const chatRoomsCollection = collection(db, 'chat_rooms')
const bottom = ref(null)
const showChatList = ref(true)
const showChatRoom = ref(false)

watch(
  messages,
  () => {
    nextTick(() => {
      bottom.value?.scrollIntoView({ behavior: 'smooth' })
    })
  },
  { deep: true }
)

function convertTZ (date, tzString) {
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }))
}

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

          if (props.chatReceiverUid) {
            if (doc.data().members.includes(props.chatReceiverUid) && doc.data().members.includes(account.uid)) {
              chatRoomExist = true
              currentChatRoomId = doc.id
            }
          }
        }
      })

      if (!chatRoomExist && props.chatReceiverUid) {
        const result = addDoc(chatRoomsCollection, {
          members: [account.uid, props.chatReceiverUid],
          createdAt: convertTZ(new Date(), 'Asia/Jakarta')
        })

        chatRoomsTemp.push({
          id: result.id,
          members: [account.uid, props.chatReceiverUid],
          createdAt: convertTZ(new Date(), 'Asia/Jakarta')
        })

        chatRoomExist = true
        currentChatRoomId = result.id
      }
      chatRooms.value = chatRoomsTemp

      const memberChatRoomsTemp = []
      memberChatRoomsUnsub = onSnapshot(collection(db, 'users'), (snapshot) => {
        const chatMember = []
        chatRooms.value.forEach((chatRoom) => {
          chatRoom.members.forEach((member) => {
            if (member !== account.uid) {
              chatMember.push({
                chat_room_id: chatRoom.id,
                user_uid: member
              })
            }
          })
        })
        snapshot.forEach((doc) => {
          chatMember.forEach((member) => {
            if (doc.id === member.user_uid) {
              memberChatRoomsTemp.push({
                id: member.user_uid,
                chat_room_id: member.chat_room_id,
                ...doc.data()
              })
            }
          })
        })

        memberChatRooms.value = memberChatRoomsTemp.reverse()

        if (props.chatReceiverUid && chatRoomExist) {
          activeMemberId.value = props.chatReceiverUid
          activeChatRoomId.value = currentChatRoomId
          activeMember.value = memberChatRooms.value.find(member => member.id === props.chatReceiverUid)
        } else {
          if (memberChatRooms.value.length > 0) {
            activeMemberId.value = memberChatRooms.value[0].id
            activeChatRoomId.value = chatRooms.value[0].id
            activeMember.value = memberChatRooms.value[0]
          }
        }

        if (props.showChatRoom) {
          showChatList.value = false
          showChatRoom.value = true
        }
      })

      messageUnsub = onSnapshot(messagesCollection, snapshot => {
        let messagesTemp = []
        let shouldSkip = false
        snapshot.forEach((doc) => {
          if (shouldSkip) {
            return
          }

          if (doc.data().chat_room_id === activeChatRoomId.value) {
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
    const messagesLength = message.value.length

    if (messagesLength > 0) {
      let messageIdExist = false
      let messageId = null
      const messageSnap = await getDocs(messagesCollection)
      let shouldSkip = false
      messageSnap.forEach(doc => {
        if (shouldSkip) {
          return
        }
        if (doc.data().chat_room_id === activeChatRoomId.value) {
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
            createdAt: convertTZ(new Date(), 'Asia/Jakarta')
          })
        })
      } else {
        await addDoc(messagesCollection, {
          chat_room_id: activeChatRoomId.value,
          messages: [{
            sender_uid: uid,
            text: message.value,
            createdAt: convertTZ(new Date(), 'Asia/Jakarta')
          }]
        })
      }
    }

    message.value = ''
    messageInput.value.focus()
  } catch (error) {
    console.error(error)
  }
}

const backToChatListHandler = () => {
  showChatList.value = true
  showChatRoom.value = false
}

const changeActiveChatRoomHandler = (chatRoomId) => {
  let activeChatRoom = null
  chatRooms.value.forEach(chatRoom => {
    if (chatRoom.id === chatRoomId) {
      activeChatRoom = chatRoom
    }
  })

  const memberId = activeChatRoom.members.find(member => member !== user.value.uid)
  if (memberId) {
    activeMemberId.value = memberId
    activeChatRoomId.value = chatRoomId
    activeMember.value = memberChatRooms.value.find(memberChatRoom => memberChatRoom.id === memberId)

    const messageUnsub = onSnapshot(messagesCollection, snapshot => {
      let messagesTemp = []
      let shouldSkip = false
      snapshot.forEach((doc) => {
        if (shouldSkip) {
          return
        }

        if (doc.data().chat_room_id === activeChatRoomId.value) {
          messagesTemp = doc.data().messages
          shouldSkip = true
        }
      })
      messagesTemp.sort((a, b) => {
        return a.createdAt - b.createdAt
      })
      messages.value = messagesTemp
    })

    showChatList.value = false
    showChatRoom.value = true
    message.value = ''
    messageInput.value.focus()
  }
}

onMounted(() => {
  if (props.chatPetId) {
    axios.get(`${CONFIG.API_BASE_URL}/pet/${props.chatPetId}`)
      .then(({ data }) => {
        message.value = `Halo saya ingin bertanya, apakah boleh saya mengadopsi ${data.pet.name}?`
      })
      .catch(error => {
        console.error(error)
      })
  }

  gsap.to(chatPopup.value, { duration: 0.3, y: 0, ease: 'power2' })
  messageInput.value.focus()
})

</script>

<template>
  <section
    class="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[99] w-full h-full max-w-[600px] bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="chatPopupContainer"
  >
    <div class="w-full h-full translate-y-full absolute top-0 left-0" ref="chatPopup">
      <section class="w-full h-full bg-white" v-show="showChatList">
         <div class="flex justify-between items-center px-3 py-2 bg-primary text-white">
          <p class="font-medium">Chats</p>
           <button class="text-lg" @click="closeChatHandler">
              <font-awesome-icon icon="times" />
          </button>
         </div>
        <div class="overflow-y-auto truncate">
            <button class="flex items-center px-3 py-2 rounded-l-md rounded-bl-none w-full text-left" v-for="member in memberChatRooms" :key="member.id" @click="changeActiveChatRoomHandler(member.chat_room_id)">
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
        </div>
      </section>
      <section class="grid grid-rows-chat shadow-andopt w-full h-full bg-white" v-show="showChatRoom">
          <div class="flex justify-between items-center px-3 py-2 bg-primary text-white">
              <div class="flex gap-5 justify-center">
                <button class="text-lg" @click="backToChatListHandler">
                  <font-awesome-icon icon="chevron-left" />
                </button>
                <div class="flex gap-2 items-center">
                    <img
                    :src="activeMember?.photoURL || skeleton"
                    class="rounded-full w-6 h-6"
                    :alt="activeMember?.username || ''"
                    />
                    <p class="font-medium">{{activeMember?.username||''}}</p>
                </div>
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
  </section>
</template>

<style scoped></style>
