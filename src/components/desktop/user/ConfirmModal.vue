<script setup>
import { gsap } from 'gsap'
import { ref, onMounted } from 'vue'

defineProps({
  type: {
    type: String,
    default: 'delete'
  },
  about: {
    type: String,
    default: 'Unggahan'
  }
})
const confirmModal = ref(null)

onMounted(() => {
  gsap.to(confirmModal.value, { duration: 0.3, scale: 1, ease: 'power2' })
})
</script>

<template>
  <section
    class="fixed top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
    ref="confirmModalContainer"
    @click="closePopup"
  >
    <div
      class="bg-white py-8 px-10 rounded-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] scale-0 overflow-y-auto"
      ref="confirmModal"
      @click="(e) => e.stopPropagation()"
    >
        <div v-if="type==='delete'">
            <p class="text-secondary font-semibold my-5 text-center">Apakah anda yakin ingin menghapus {{about}} ini?</p>
            <div class="flex justify-center gap-3">
                <button class="py-2 px-6 bg-pink text-white rounded-md text-sm">
                    Ya
                </button>
                <button class="py-2 px-6 bg-primary text-white rounded-md text-sm">
                    Batalkan
                </button>
            </div>
        </div>
    </div>
  </section>
</template>

<style scoped></style>
