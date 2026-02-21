<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";

const overlay = ref<HTMLElement | null>(null);
const text = ref<HTMLElement | null>(null);
const progress = ref(0);

onMounted(() => {
  const tl = gsap.timeline();

  // Fake progress simulation
  const progressInterval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += Math.floor(Math.random() * 10) + 1;
      if (progress.value > 100) progress.value = 100;
    } else {
      clearInterval(progressInterval);
      revealSite();
    }
  }, 50);

  const revealSite = () => {
    tl.to(text.value, {
      opacity: 0,
      y: -20,
      duration: 0.5,
    }).to(overlay.value, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1.2,
      ease: "power4.inOut",
    });
  };
});
</script>

<template>
  <div
    ref="overlay"
    class="fixed inset-0 z-10000 bg-white flex flex-col items-center justify-center"
  >
    <div ref="text" class="text-black text-center">
      <h2 class="text-xs uppercase tracking-[0.5em] font-bold mb-4">
        Initialising Experience
      </h2>
      <div class="text-7xl font-bold tracking-tighter">{{ progress }}%</div>
    </div>
  </div>
</template>
