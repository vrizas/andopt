<script setup>
import { gsap } from 'gsap'
import { ref, computed } from 'vue'
import axios from 'axios'
import { RouterLink, RouterView, useRouter } from 'vue-router'

import { getAuth, signOut, updateProfile, updatePassword, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import defaultProfilePic from '../../../assets/images/default-profile-pic.png'
import CONFIG from '../../../config'

const usernameIn = ref('')
const newProfilePic = ref(null)
const storage = getStorage()
const currentProfilePicUrl = ref('')
const currentUsername = ref('')
const currentEmail = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')
const newPasswordEl = ref(null)
const confirmNewPasswordEl = ref(null)

const router = useRouter()
const auth = getAuth()
const user = ref(null)

onAuthStateChanged(auth, (account) => {
  if (account) {
    currentUsername.value = account.displayName
    currentEmail.value = account.email
    currentProfilePicUrl.value = account.photoURL
    user.value = account
  }
})

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
        currentProfilePicUrl.value = downloadURL
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
            displayName: usernameIn.value || currentUsername.value,
            photoURL: downloadURL
          }).then(() => {
            user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
              axios.put(`${CONFIG.API_BASE_URL}/user/${user.value.uid}`, {
                username: usernameIn.value || currentUsername.value,
                photoURL: downloadURL
              }, {
                headers: {
                  'X-Firebase-Token': idToken
                }
              })
            }).catch(function (error) {
              alert(error.message)
            })

            currentUsername.value = usernameIn.value || currentUsername.value
            currentProfilePicUrl.value = downloadURL
            const desertRef = storageRef(storage, `images/profile-pics/profile-pic-${user.value.uid}(temp)`)
            deleteObject(desertRef).then(() => {
              alert('Data profil berhasil diperbarui')
            }).catch((error) => {
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
      displayName: usernameIn.value || currentUsername.value
    }).then(() => {
      user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
        axios.put(`${CONFIG.API_BASE_URL}/user/${user.value.uid}`, {
          username: usernameIn.value || currentUsername.value,
          photoURL: user.value.photoURL
        }, {
          headers: {
            'X-Firebase-Token': idToken
          }
        })
        alert('Data profil berhasil diperbarui')
      }).catch(function (error) {
        alert(error.message)
      })
    })
  }
}

const changePasswordHandler = () => {
  if (!newPassword.value || !confirmNewPassword.value) {
    alert('Mohon isi semua field')
    return
  }

  if (newPassword.value !== confirmNewPassword.value) {
    newPasswordEl.value.style.borderColor = '#EF144A'
    gsap.from(newPasswordEl.value, { duration: 0.3, x: 10, ease: 'bounce' })
    confirmNewPasswordEl.value.style.borderColor = '#EF144A'
    gsap.from(confirmNewPasswordEl.value, { duration: 0.3, x: 10, ease: 'bounce' })
    return
  }

  updatePassword(user, newPassword.value).then(() => {
    alert('Password berhasil diubah')
  }).catch((error) => {
    alert(error.message)
  })
}

const signOutHandler = () => {
  signOut(auth).then(() => {
    router.push('/')
  }).catch((error) => {
    alert(error.message)
  })
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <section class="shadow-andopt w-full py-8 px-10 rounded-md">
      <h2 class="text-primary text-lg font-semibold mb-8">Edit Profile</h2>
      <div class="flex gap-12 ml-6">
        <div class="relative w-fit h-fit">
          <img :src="currentProfilePicUrl || defaultProfilePic" alt="profil" class="w-48 h-48 rounded-full object-cover" draggable="false">
          <label for="profilePic" class="absolute bottom-0 right-0 w-10 h-10 bg-[#cccccc] rounded-full flex items-center justify-center text-lg border-white border-4">
            <input type="file" id="profilePic" class="hidden" @change="onFileChange">
            <font-awesome-icon icon="camera" />
          </label>
        </div>
        <form class="flex flex-col gap-3 text-sm w-3/5" @submit.prevent="updateProfileHandler">
          <div class="flex flex-col gap-1">
            <label for="username">Username</label>
            <input
              class="py-3 px-4 border-b-2 border-primary bg-white"
              type="text"
              id="username"
              :value="currentUsername"
              @input="usernameIn = $event.target.value"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="email">Email</label>
            <input
              class="py-3 px-4 border-b-2 border-primary"
              type="email"
              id="email"
              :value="currentEmail"
              disabled
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
    <section class="shadow-andopt w-1/2 py-8 px-10 rounded-md">
      <h2 class="text-primary text-lg font-semibold mb-8">Ubah Password</h2>
      <div class="ml-6">
        <form class="flex flex-col gap-3 text-sm" @submit.prevent="changePasswordHandler">
          <div class="flex flex-col gap-1">
            <label for="newPassword">Password Baru</label>
            <input
              class="py-3 px-4 border-b-2 border-primary bg-white"
              type="password"
              v-model="newPassword"
              ref="newPasswordEl"
              id="newPassword"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="confirmNewPassword">Konfirmasi Password Baru</label>
            <input
              class="py-3 px-4 border-b-2 border-primary bg-white"
              type="password"
              v-model="confirmNewPassword"
              ref="confirmNewPasswordEl"
              id="confirmNewPassword"
            />
          </div>
          <div class="w-full text-left">
            <button
              class="bg-primary text-white px-5 py-2 rounded-md font-semibold mt-4"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
