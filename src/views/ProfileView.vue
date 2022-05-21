<script setup>
import { ref, onMounted } from "vue";
import { reactive, computed } from "vue";
import gsap from "gsap";

const editProfilePopupContainer = ref(null);
const editProfilePopup = ref(null);

function showEditProfilePopUpHandler() {
  currentHashLink.hash = "#edit";
  gsap.to(editProfilePopup.value, { duration: 0.3, y: 0, ease: "power2" });

  history.replaceState(undefined, undefined, "#edit");
}

function closeEditProfilePopUpHandler() {
  gsap.to(editProfilePopup.value, { duration: 0.3, y: "100%", ease: "power2" });
  setTimeout(() => {
    currentHashLink.hash = "#";
    history.replaceState(undefined, undefined, "#");
  }, 300);
}

const currentHashLink = reactive({
  hash: "#",
});

const showEditProfilePopUp = computed(() => {
  return currentHashLink.hash === "#edit";
});

onMounted(() => {
  currentHashLink.hash = window.location.hash || "#";

  if (currentHashLink.hash === "#edit") {
    showEditProfilePopUpHandler();
  }
});
</script>

<template>
  <header class="bg-primary w-full h-[60px]"></header>
  <main class="py-8 px-4">
    <section class="flex items-center gap-4 relative">
      <span
        class="flex justify-center items-center bg-[#eeeeee] text-5xl text-secondary rounded-full p-5"
      >
        <ion-icon name="paw"></ion-icon>
      </span>
      <div>
        <h2 class="text-xl font-semibold">ardiganteng123</h2>
        <p class="text-darkGray mt-1">ardimasyrofi@gmail.com</p>
      </div>
      <button
        class="text-3xl text-darkGray absolute right-0 top-2"
        @click="showEditProfilePopUpHandler"
      >
        <ion-icon name="create"></ion-icon>
      </button>
    </section>
    <section
      class="absolute top-0 left-0 z-50 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden"
      ref="editProfilePopupContainer"
      v-show="showEditProfilePopUp"
    >
      <div
        class="w-full h-full bg-white translate-y-full py-4 px-5 absolute top-0 left-0"
        ref="editProfilePopup"
      >
        <button
          class="absolute right-5 text-3xl"
          @click="closeEditProfilePopUpHandler"
        >
          <ion-icon name="close"></ion-icon>
        </button>
        <h2 class="text-primary text-2xl font-semibold my-5">Edit Profile</h2>
        <div class="flex justify-center">
          <span
            class="flex justify-center items-center bg-[#eeeeee] text-5xl text-secondary rounded-full p-5 w-fit"
          >
            <ion-icon name="paw"></ion-icon>
          </span>
        </div>
        <form class="flex flex-col gap-3 mt-10">
          <div class="flex flex-col gap-1">
            <label for="username">Username</label>
            <input
              class="py-3 px-4 bg-white border-b-2 border-primary"
              type="text"
              id="username"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="email">Email</label>
            <input
              class="py-3 px-4 bg-white border-b-2 border-primary"
              type="email"
              id="email"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="password">Password</label>
            <input
              class="py-3 px-4 bg-white border-b-2 border-primary"
              type="password"
              id="password"
            />
          </div>
          <div class="w-full text-center">
            <button
              class="bg-primary text-white px-4 py-3 w-1/3 rounded-md font-semibold mt-4"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </section>
    <section class="mt-10">
      <h3 class="text-lg font-medium">Dashboard</h3>
      <div class="flex flex-col gap-4 mt-5">
        <a href="#" class="flex items-center gap-3">
          <span
            class="flex justify-center items-center text-lg text-white w-8 h-8 bg-pink rounded-full"
          >
            <ion-icon name="heart"></ion-icon>
          </span>
          Favorit Saya
        </a>
        <a href="#" class="flex items-center gap-3">
          <span
            class="flex justify-center items-center text-lg text-white w-8 h-8 bg-darkGray rounded-full"
          >
            <ion-icon name="time"></ion-icon>
          </span>
          Terakhir Dilihat
        </a>
        <a href="#" class="flex items-center gap-3">
          <span
            class="flex justify-center items-center text-lg text-white w-8 h-8 bg-secondary rounded-full"
          >
            <ion-icon name="paw"></ion-icon>
          </span>
          Unggahan Saya
        </a>
      </div>
    </section>
    <button
      class="text-pink border-2 border-pink rounded-md py-2 px-8 font-semibold mt-10 focus:bg-pink focus:text-white active:bg-pink active:text-white"
    >
      Keluar
    </button>
  </main>
</template>

<style></style>
