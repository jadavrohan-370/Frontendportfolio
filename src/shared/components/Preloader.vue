<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";

const overlay = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const progress = ref(0);

onMounted(() => {
  // Fade in content
  gsap.fromTo(contentRef.value, 
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
  );

  // Progress simulation
  const progressInterval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += Math.floor(Math.random() * 15) + 5;
      if (progress.value > 100) progress.value = 100;
    } else {
      clearInterval(progressInterval);
      revealSite();
    }
  }, 80);

  const revealSite = () => {
    gsap.to(contentRef.value, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in"
    });
    
    gsap.to(overlay.value, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1,
      ease: "power4.inOut",
      delay: 0.2
    });
  };
});
</script>

<template>
  <div
    ref="overlay"
    class="fixed inset-0 z-10000 flex items-center justify-center"
    style="background: #0A0A0A"
  >
    <div ref="contentRef" class="text-center">
      <div class="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
        <div
          class="h-full bg-white rounded-full transition-all duration-300 ease-out"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
      <p class="text-white/60 text-xs tracking-[0.3em] uppercase" style="font-family: var(--font-display)">
        {{ progress }}%
      </p>
    </div>
  </div>
</template>
