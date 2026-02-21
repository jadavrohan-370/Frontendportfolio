<script setup lang="ts">
// Performance tip: Using CSS variables and keyframes for high-performance background motion
</script>

<template>
  <div
    class="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-background"
  >
    <!-- Liquid Blobs -->
    <div
      class="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[120px] animate-blob"
    ></div>
    <div
      class="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-accent-green/10 blur-[100px] animate-blob animation-delay-2000"
    ></div>
    <div
      class="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-neon/10 blur-[110px] animate-blob animation-delay-4000"
    ></div>

    <!-- Grain Overlay -->
    <div
      class="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none noise-bg"
    ></div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite alternate ease-in-out;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.noise-bg {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
</style>
