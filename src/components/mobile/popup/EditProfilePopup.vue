<script setup>
import { gsap } from 'gsap'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getAuth, updateProfile, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import defaultProfilePic from '../../../assets/images/default-profile-pic.png'
import CONFIG from '../../../config'

const username = ref('')
const newProfilePic = ref(null)
const editProfilePopup = ref(null)
const storage = getStorage()
const profilePicUrl = ref('')
const currentUsername = ref('')
const currentEmail = ref('')
const auth = getAuth()
const user = ref(null)

onAuthStateChanged(auth, (account) => {
  if (account) {
    currentUsername.value = account.displayName
    currentEmail.value = account.email
    profilePicUrl.value = account.photoURL
    user.value = account
  }
})

const closePopup = () => {
  profilePicUrl.value = user.value.photoURL

  window.location.hash = '/'
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  newProfilePic.value = file
  const storageImageRef = storageRef(storage, `images/profile-pics/profile-pic-${user.value.uid}(temp)`)
  const uploadTask = uploadBytesResumable(storageImageRef, file)

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      console.log('Upload is ' + progress + '% done')
    },
    (error) => {
      alert(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        profilePicUrl.value = downloadURL
      })
    }
  )
}

const updateProfileHandler = () => {
  if (newProfilePic.value) {
    const storageImageRef = storageRef(storage, `images/profile-pics/profile-pic-${user.value.uid}`)
    const uploadTask = uploadBytesResumable(storageImageRef, newProfilePic.value)

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        console.log('Upload is ' + progress + '% done')
      },
      (error) => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            displayName: username.value || currentUsername.value,
            photoURL: downloadURL
          }).then(() => {
            user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
              axios.put(`${CONFIG.API_BASE_URL}/user/${user.value.uid}`, {
                username: username.value || currentUsername.value,
                photoURL: downloadURL
              }, {
                headers: {
                  'X-Firebase-Token': idToken
                }
              })
            }).catch(function (error) {
              alert(error.message)
            })

            currentUsername.value = username.value || currentUsername.value
            profilePicUrl.value = downloadURL

            const desertRef = storageRef(storage, `images/profile-pics/profile-pic-${user.value.uid}(temp)`)
            deleteObject(desertRef).then(() => {
              closePopup()
            }).catch(function (error) {
              alert(error.message)
            })
          }).catch((error) => {
            alert(error.message)
          })
        })
      }
    )
  } else {
    updateProfile(auth.currentUser, {
      displayName: username.value || currentUsername.value
    }).then(() => {
      user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
        axios.put(`${CONFIG.API_BASE_URL}/user/${user.value.uid}`, {
          username: username.value || currentUsername.value,
          photoURL: user.value.photoURL
        }, {
          headers: {
            'X-Firebase-Token': idToken
          }
        })
        closePopup()
      }).catch(function (error) {
        alert(error.message)
      })
    })
  }
}

onMounted(() => {
  gsap.to(editProfilePopup.value, { duration: 0.3, y: 0, ease: 'power2' })
})
</script>

<template>
  <section
      class="fixed top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
      ref="editProfilePopupContainer"
    >
      <div
        class="w-full h-full bg-white translate-y-full py-4 px-5 absolute top-0 left-0 overflow-y-auto"
        ref="editProfilePopup"
      >
        <button
          class="absolute right-5 text-2xl"
          @click="closePopup"
        >
          <font-awesome-icon icon="xmark" />
        </button>
        <h2 class="text-primary text-xl font-semibold my-5">Sunting Profil</h2>
        <div class="flex justify-center">
          <div class="relative w-fit">
            <img :src="profilePicUrl || defaultProfilePic" alt="profil" class="w-36 h-36 rounded-full object-cover" draggable="false">
            <label for="profilePic" class="absolute bottom-0 right-0 w-10 h-10 bg-[#cccccc] rounded-full flex items-center justify-center text-lg border-white border-4">
              <input type="file" id="profilePic" class="hidden" @change="onFileChange">
              <font-awesome-icon icon="camera" />
            </label>
          </div>
        </div>
        <form class="flex flex-col gap-3 mt-10" @submit.prevent="updateProfileHandler">
          <div class="flex flex-col gap-1">
            <label for="username">Username</label>
            <input
              class="py-3 px-4 bg-white border-b-2 border-primary"
              type="text"
              id="username"
              :value="currentUsername"
              @input="username = $event.target.value"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="email">Email</label>
            <input
              class="py-3 px-4 bg-white border-b-2 border-primary"
              type="email"
              id="email"
              :value="currentEmail"
              disabled
            />
          </div>
          <div class="w-full text-center">
            <button
              class="bg-primary text-white px-4 py-2 w-1/3 rounded-md font-semibold mt-4"
            >
              Simpan
            </button>
          </div>
        </form>
        <p class="text-darkGray text-sm my-5 text-center">Atau</p>
        <p class="text-center border border-darkGray px-4 py-2 rounded-md font-semibold">
          <a href="#/edit-password">Ubah Password </a>
        </p>
      </div>
    </section>
</template>
