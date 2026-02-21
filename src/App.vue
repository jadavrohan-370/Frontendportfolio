<script setup lang="ts">
import CustomCursor from './shared/components/CustomCursor.vue'
import Preloader from './shared/components/Preloader.vue'
import Navbar from './shared/components/Navbar.vue'
</script>

<template>
  <Preloader />
  <CustomCursor />
  <Navbar />

  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(24px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
