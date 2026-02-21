<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

const cursorRef = ref<HTMLElement | null>(null);
const cursorInnerRef = ref<HTMLElement | null>(null);

const onMouseMove = (e: MouseEvent) => {
  if (!cursorRef.value || !cursorInnerRef.value) return;

  gsap.to(cursorRef.value, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.6,
    ease: "power3.out",
  });

  gsap.to(cursorInnerRef.value, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
  });
};

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove);

  const handleHover = () => {
    const interactables = document.querySelectorAll(
      "button, a, .group, .magnetic",
    );
    interactables.forEach((el) => {
      // Avoid multiple listeners
      if ((el as any)._cursorReady) return;
      (el as any)._cursorReady = true;

      el.addEventListener("mouseenter", () => {
        gsap.to(cursorRef.value, { scale: 3, opacity: 0.2, duration: 0.3 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(cursorRef.value, { scale: 1, opacity: 1, duration: 0.3 });
      });
    });
  };

  handleHover();
  // Re-run periodically as content breeds or sections reveal
  const interval = setInterval(handleHover, 2000);

  onUnmounted(() => {
    clearInterval(interval);
  });
});

onUnmounted(() => {
  window.removeEventListener("mousemove", onMouseMove);
});
</script>

<template>
  <div class="fixed pointer-events-none z-9999 hidden md:block">
    <div
      ref="cursorRef"
      class="w-10 h-10 border border-neon rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    ></div>
    <div
      ref="cursorInnerRef"
      class="fixed w-1.5 h-1.5 bg-neon rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10000"
    ></div>
  </div>
</template>
