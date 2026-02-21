<script setup lang="ts">
interface Props {
  text: string
  href?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false
})
</script>

<template>
  <div class="relative inline-block">
    <a
      v-if="href"
      :href="href"
      class="group relative flex items-center justify-center px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-500 hover:pr-14"
    >
      <span class="relative z-10 transition-colors duration-500 group-hover:text-black">{{ text }}</span>
      <div class="absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">↗</div>
      <div class="absolute inset-0 bg-neon scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out"></div>
    </a>

    <button
      v-else
      :type="type"
      :disabled="disabled"
      class="group relative flex items-center justify-center px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span class="relative z-10">{{ text }}</span>
      <div class="absolute inset-0 bg-neon scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out"></div>
    </button>
  </div>
</template>
