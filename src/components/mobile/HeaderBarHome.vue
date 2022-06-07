<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false
  }
})

const header = ref(null)

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      header.value.classList.add('bg-primary')
    } else {
      header.value.classList.remove('bg-primary')
    }
  })
})
</script>

<template>
    <div>
        <header class="px-3 py-2 w-full fixed z-10 top-0 flex justify-between" ref="header" v-if="isLoggedIn">
            <div class="relative w-4/5">
                <input type="search" class="py-2 pl-10 pr-3 w-full text-xs rounded focus:outline-0" placeholder="Masukkan jenis peliharaan"/>
                <span class="absolute top-0 left-0 h-full w-10 text-sm flex items-center justify-center text-darkGray">
                    <font-awesome-icon icon="magnifying-glass"/>
                </span>
            </div>
            <nav class="flex gap-7 text-lg text-white">
                <button class="relative">
                    <font-awesome-icon icon="bell" />
                    <span class="absolute top-[2px] right-[-5px] text-[11px] leading-none bg-pink rounded-full h-3 w-3 flex justify-center items-center">1</span>
                </button>
                <button class="relative">
                    <font-awesome-icon icon="comment-dots" />
                    <span class="absolute top-[2px] right-[-5px] text-[11px] leading-none bg-pink rounded-full h-3 w-3 flex justify-center items-center">1</span>
                </button>
            </nav>
        </header>
        <header class="px-3 py-2 w-full gap-6 fixed z-10 top-0 flex justify-between" ref="header" v-else>
            <div class="relative w-4/5">
                <input type="search" class="py-2 pl-10 pr-3 w-full text-xs rounded focus:outline-0" placeholder="Masukkan jenis peliharaan"/>
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
