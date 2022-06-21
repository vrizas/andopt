<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DropdownList from '../../../components/desktop/user/DropdownList.vue'
import AutoCompleteList from '../../../components/desktop/user/AutoCompleteList.vue'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { nanoid } from 'nanoid'
import cities from '../../../utils/cities'
import CONFIG from '../../../config'

const petName = ref('')
const petType = ref('')
const petRace = ref('')
const petAgeNumber = ref(0)
const petAgeUnit = ref('tahun')
const petGender = ref('Jantan')
const petLoc = ref('')
const petDesc = ref('')
const petPhotoUrls = ref([])
const newPetPhotos = ref(null)
const petsLength = ref(0)
const petId = ref('')
const flashMessage = ref('')
const filteredCities = ref([])
const isUploaded = ref(false)
const openDropdownAgeUnit = ref(false)
const openDropdownPetGender = ref(false)
const autoCompleteListVisible = ref(false)

const ageUnits = ref([
  'tahun',
  'bulan',
  'hari'
])

const petGenders = ref([
  'Jantan',
  'Betina',
  'Tidak Tahu'
])

const router = useRouter()
const storage = getStorage()
const auth = getAuth()
const user = ref(null)
onAuthStateChanged(auth, (account) => {
  if (account) {
    user.value = account
  } else {
    user.value = null
    window.location.href = '/#/login'
  }
})

const uploadImageAsPromise = (file, isTemp = true) => {
  return new Promise((resolve, reject) => {
    let storageImageRef = null
    if (isTemp) {
      storageImageRef = storageRef(storage, `images/pets/pet-${user.value.uid}-${petsLength.value}(temp)`)
    } else {
      storageImageRef = storageRef(storage, `images/pets/pet-${user.value.uid}/${petId.value}/${petsLength.value}`)
    }

    const uploadTask = uploadBytesResumable(storageImageRef, file)

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        flashMessage.value = 'Proses unggah sedang berlangsung...'
      },
      (error) => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          flashMessage.value = ''
          resolve(downloadURL)
        })
      }
    )
  })
}

const deleteImageAsPromise = (petPhotoId) => {
  return new Promise((resolve, reject) => {
    const storageImageRef = storageRef(storage, `images/pets/pet-${user.value.uid}-${petPhotoId}(temp)`)
    deleteObject(storageImageRef).then(() => {
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}

const onFileChange = async (e) => {
  for (let i = 0; i < petsLength.value; i++) {
    const petPhotoId = i
    await deleteImageAsPromise(petPhotoId)
  }
  newPetPhotos.value = e.target.files
  petsLength.value = 0
  for (let i = 0; i < e.target.files.length; i++) {
    const imageFile = e.target.files[i]
    uploadImageAsPromise(imageFile)
    petsLength.value++
  }

  isUploaded.value = true
}

const selectAgeUnitHandler = (e) => {
  const choosenAgeUnit = e.target.innerText.trim()
  petAgeUnit.value = choosenAgeUnit
  openDropdownAgeUnit.value = false
}

const selectPetGenderHandler = (e) => {
  const choosenPetGender = e.target.innerText.trim()
  petGender.value = choosenPetGender
  openDropdownPetGender.value = false
}

const autoCompleteHandler = (e) => {
  const userData = e.target.value
  if (userData) {
    filteredCities.value = cities.value.filter((city) => city.toLowerCase().includes(userData.toLowerCase()))
    autoCompleteListVisible.value = true
  } else {
    autoCompleteListVisible.value = false
  }
}

const useAutocomplete = (e) => {
  const choosenCity = e.target.innerText.trim()
  petLoc.value = choosenCity
  autoCompleteListVisible.value = false
}

const submitHandler = async () => {
  if (petName.value && petType.value && petRace.value && petGender.value && petLoc.value && petDesc.value) {
    flashMessage.value = 'Proses sedang berlangsung...'
  } else {
    alert('Data tidak lengkap')
  }

  user.value.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
    petId.value = nanoid(16)
    petsLength.value = 0
    for (let i = 0; i < newPetPhotos.value.length; i++) {
      const imageFile = newPetPhotos.value[i]
      const imageUrl = await uploadImageAsPromise(imageFile, false)
      petPhotoUrls.value.push(imageUrl)
      petsLength.value++
    }

    for (let i = 0; i < petsLength.value; i++) {
      const petPhotoId = i
      await deleteImageAsPromise(petPhotoId)
    }

    const config = {
      headers: {
        'X-Firebase-Token': idToken
      }
    }

    const pet = {
      id: petId.value,
      name: petName.value,
      imageUrls: petPhotoUrls.value,
      age: `${petAgeNumber.value} ${petAgeUnit.value}`,
      gender: petGender.value,
      type: {
        name: petType.value,
        race: petRace.value
      },
      location: petLoc.value,
      desc: petDesc.value
    }

    await axios.post(`${CONFIG.API_BASE_URL}/user/${user.value.uid}/pet`, pet, config)
    flashMessage.value = ''
    router.push('/my/upload')
  }).catch(function (error) {
    alert(error.message)
  })
}
</script>

<template>
  <main class="py-8 px-10 bg-white">
    <h2 class="text-darkGray text-lg font-semibold mb-5">Unggah Hewan Peliharaan</h2>
    <form class="flex gap-10">
      <label for="petImages" class="w-[250px] h-[250px] border border-dashed border-darkGray rounded-lg text-darkGray text-2xl flex items-center justify-center" v-if="!isUploaded">
        <input type="file" id="petImages" class="hidden" @change="onFileChange" multiple accept="image/*" required>
        <font-awesome-icon icon="file-circle-plus" />
      </label>
      <label for="petImages" class="w-[250px] h-[250px] border border-dashed border-secondary rounded-lg text-darkGray text-2xl flex items-center justify-center" v-else>
        <input type="file" id="petImages" class="hidden" @change="onFileChange" multiple accept="image/*" required>
        <font-awesome-icon icon="images" class="text-secondary" />
      </label>
      <div class="flex flex-col gap-4 text-sm w-1/2">
        <div class="flex flex-col gap-1">
          <label for="petName">Nama Hewan <span class="text-pink">*</span></label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            v-model="petName"
            id="petName"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="petType">Jenis Hewan <span class="text-pink">*</span></label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            v-model="petType"
            id="petType"
            placeholder="Kucing"
            required
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="petRace">Ras Hewan</label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            v-model="petRace"
            id="petRace"
            placeholder="Persia"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="petAge">Umur Hewan</label>
          <div class="flex gap-5">
            <input class="py-3 px-4 bg-white border-b-2 border-primary text-sm" type="number" v-model="petAgeNumber" id="petAge">
            <span class="relative w-[120px]" @mouseenter="openDropdownAgeUnit = true" @mouseleave="openDropdownAgeUnit = false">
              <input class="w-full py-3 px-4 bg-white border-b-2 border-primary text-sm cursor-pointer" type="text" v-model="petAgeUnit" disabled>
              <font-awesome-icon icon="chevron-down" class="absolute right-[15px] top-1/2 translate-y-[-50%]" />
              <DropdownList :list="ageUnits" :clickHandler="selectAgeUnitHandler" v-show="openDropdownAgeUnit" />
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <label for="petGender">Jenis Kelamin <span class="text-pink">*</span></label>
          <span class="relative w-[150px]" @mouseenter="openDropdownPetGender = true" @mouseleave="openDropdownPetGender = false">
              <input class="w-full py-3 px-4 bg-white border-b-2 border-primary text-sm cursor-pointer" type="text" v-model="petGender" disabled>
              <font-awesome-icon icon="chevron-down" class="absolute right-[15px] top-1/2 translate-y-[-50%]" />
              <DropdownList :list="petGenders" :clickHandler="selectPetGenderHandler" v-show="openDropdownPetGender" />
            </span>
        </div>
        <div class="flex flex-col gap-1">
          <label for="petLoc">Lokasi <span class="text-pink">*</span></label>
          <input
            class="py-3 px-4 bg-white border-b-2 border-primary text-sm"
            type="text"
            v-model="petLoc"
            id="petLoc"
            @keyup="autoCompleteHandler"
            required
          />
          <div class="relative">
            <AutoCompleteList
              :cities="filteredCities"
              :clickHandler="useAutocomplete"
              v-show="autoCompleteListVisible"
            />
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <label for="petDesc">Deskripsi Hewan <span class="text-pink">*</span></label>
          <textarea id="petDesc" cols="30" rows="5" class="py-3 px-4 bg-white border-b-2 border-primary text-sm" v-model="petDesc" required></textarea>
        </div>
        <div class="flex gap-3 mt-5">
          <button class="py-2 px-8 bg-primary text-white text-sm rounded-md" @click.prevent="submitHandler">Unggah</button>
          <button @click="$router.go(-1)" class="py-2 px-8 bg-secondary text-white text-sm rounded-md">Kembali</button>
        </div>
      </div>
    </form>
    <div class="fixed bottom-[30px] bg-secondary text-white px-5 py-2 text-sm rounded-md" v-show="flashMessage.length > 0">
      <p>{{ flashMessage }}</p>
    </div>
  </main>
</template>
