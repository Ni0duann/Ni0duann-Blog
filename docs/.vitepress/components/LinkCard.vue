<template>
  <div
    @click="openLink"
    class="link-card group my-3 cursor-pointer rounded-lg bg-blue-200/30 p-4 shadow-sm shadow-blue-400/60 transition-all duration-300 hover:scale-[0.99] hover:bg-blue-100/80 dark:bg-sky-950 dark:shadow-sky-900/80 dark:hover:bg-sky-950/80"
  >
    <header class="font-bold">{{ icon || '🐳' }} {{ desc }}</header>
    <footer
      class="mt-1 line-clamp-1 text-slate-500 transition-all duration-300 dark:text-slate-400 dark:group-hover:text-sky-400"
    >
      {{ link }}
    </footer>
  </div>
</template>

<script setup>
const { desc, link, icon } = defineProps(['desc', 'link', 'icon'])
function openLink() {
  window.open(link, '_blank')
}
</script>
