<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<template>
  <main class="grid grid-cols-profile gap-5 min-h-[80vh]">
    <aside class="shadow-andopt py-4 px-5 h-fit rounded-md">
        <form>
            <section class="flex justify-between items-center text-sm">
                <h2 class="font-semibold">Terapkan Filter</h2>
                <button type="reset" class="text-primary font-semibold">Reset Filter</button>
            </section>
            <hr class="text-[#ccc] my-5">
            <section>
                <div>
                    <h3 class="text-sm font-medium">Berdasarkan Kategori</h3>
                    <div>
                        <div class="flex items-center mb-4">
                            <input id="category-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm" >
                            <label for="category-1" class="ml-2 text-sm font-medium">Kucing</label>
                        </div>
                    </div>
                </div>
            </section>
        </form>

    </aside>
  </main>
</template>
