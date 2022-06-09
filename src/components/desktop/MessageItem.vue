<script setup>
defineProps({
  isSender: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  createdAt: {
    type: String,
    default: ''
  }
})

const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' tahun yang lalu'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' bulan yang lalu'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' hari yang lalu'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' jam yang lalu'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' menit yang lalu'
  }
  return Math.floor(seconds) + ' detik yang lalu'
}

</script>

<template>
    <div class="flex flex-col gap-1" :class="{'items-end': isSender}">
        <p class="rounded-md py-2 px-3" :class="isSender ? 'bg-primaryChat' : 'bg-[#eaeaea]'">{{ message }}</p>
        <span class="text-xs">{{timeSince(createdAt)}}</span>
    </div>
</template>
