<script setup>
import { ref } from 'vue'

const tabImages = ref(null)

const scrollAmount = ref(0)
const scrollMin = ref(0)

const scrollRightHandler = () => {
  tabImages.value.scrollTo({
    top: 0,
    left: Math.max(scrollAmount.value += 500, tabImages.value.clientWidth),
    behavior: 'smooth'
  })
}

const scrollLeftHandler = () => {
  tabImages.value.scrollTo({
    top: 0,
    left: Math.min(scrollAmount.value -= 500, scrollMin.value),
    behavior: 'smooth'
  })
}
</script>

<template>
  <main class="py-8 px-10 flex gap-10 bg-white min-h-[70vh]">
    <section class="relative flex flex-col gap-5 items-center">
      <img src="../../assets/images/cat.jpg" alt="cat" class="w-72 h-72 object-cover rounded-lg">
      <div class="relative">
        <div class="flex gap-4 overflow-x-auto w-60 px-2 tab-images" ref="tabImages">
          <img src="../../assets/images/cat.jpg" alt="cat" class="w-16 h-16 object-cover rounded-md cursor-pointer active">
          <img src="../../assets/images/cat.jpg" alt="cat" class="w-16 h-16 object-cover rounded-md cursor-pointer">
          <img src="../../assets/images/cat.jpg" alt="cat" class="w-16 h-16 object-cover rounded-md cursor-pointer">
          <img src="../../assets/images/cat.jpg" alt="cat" class="w-16 h-16 object-cover rounded-md cursor-pointer">
        </div>
        <button class="absolute right-[-20px] top-1/2 translate-y-[-50%] bg-lightGray w-8 h-8 rounded-full flex items-center justify-center" @click="scrollRightHandler">
          <font-awesome-icon icon="chevron-right" />
        </button>
        <button class="absolute left-[-20px] top-1/2 translate-y-[-50%] bg-lightGray w-8 h-8 rounded-full flex items-center justify-center" @click="scrollLeftHandler">
          <font-awesome-icon icon="chevron-left" />
        </button>
      </div>

    </section>
    <section class="w-1/2">
      <h2 class="font-bold text-xl">
        Ardi
        <font-awesome-icon icon="mars" class="text-darkGray text-2xl ml-3" />
      </h2>
      <p class="mt-2">Kucing Persia</p>
      <p class="font-medium text-darkGray mt-1">2 tahun</p>
      <p class="mt-3">
        <font-awesome-icon
          icon="location-dot"
          class="text-primary mr-1"
        />
        Jakarta
      </p>
      <div class="mt-8">
        <h3 class="font-medium text-lg text-darkGray mb-2">Deskripsi</h3>
        <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati porro officiis illo cupiditate fuga tempora amet eum, officia, natus adipisci ratione. Amet sint velit nesciunt itaque enim qui quasi non fugit. Accusamus blanditiis quas exercitationem eaque, quam quidem, cupiditate perferendis autem quaerat vel architecto ut suscipit delectus consectetur molestiae incidunt!</p>
      </div>
    </section>
    <aside class="shadow-andopt w-1/4 py-8 px-6 rounded-lg h-fit">
      <h4 class="text-xs text-medium text-darkGray mb-2">Pemilik</h4>
      <a href="#" class="flex gap-2 items-center font-semibold truncate">
          <img src="../../assets/images/default-profile-pic.png" alt="profil" class="w-8 h-8 rounded-full object-cover" draggable="false">
          vrizas
      </a>
      <hr class="my-4 text-lightGray">
      <div class="flex flex-col gap-3">
        <button class="bg-primary text-white font-semibold text-sm py-1 px-5 w-full rounded-md">
          <font-awesome-icon icon="comment-dots" class="mr-1" />
          Chat
        </button>
        <button class="bg-secondary text-white font-semibold text-sm py-1 px-5 w-full rounded-md">
          <font-awesome-icon icon="paw" class="mr-1" />
          Adopsi
        </button>
        <button class="border border-pink text-pink hover:bg-pink hover:text-white font-semibold text-sm py-1 px-5 w-full rounded-md">
          <font-awesome-icon icon="heart" class="mr-1"/>
          Sukai
        </button>
      </div>
    </aside>
  </main>
</template>

<style scoped>
  .tab-images .active {
    border: 4px solid #E06B2D;
    transition: .5s;
  }

  .tab-images::-webkit-scrollbar {
      display: none;
  }

  .tab-images {
      -ms-overflow-style: none;
      scrollbar-width: none;
  }
</style>
