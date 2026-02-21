<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";

// Performance tip: Using CSS variables and keyframes for high-performance background motion
const canvasRef = ref<HTMLCanvasElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const subtitleRef = ref<HTMLElement | null>(null);
const descRef = ref<HTMLElement | null>(null);
const ctaRef = ref<HTMLElement | null>(null);
const tagsRef = ref<HTMLElement | null>(null);

let cleanup: () => void;

onMounted(async () => {
  if (canvasRef.value) {
    const { useHeroScene: initHero } = await import("./useHeroScene");
    cleanup = initHero(canvasRef.value!);
  }

  const tl = gsap.timeline({
    defaults: { ease: "expo.out", duration: 1.8 },
    delay: 0.5,
  });

  tl.fromTo(subtitleRef.value, { y: 40, opacity: 0 }, { y: 0, opacity: 1 })
    .fromTo(
      titleRef.value,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1 },
      "-=1.4",
    )
    .fromTo(descRef.value, { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, "-=1.2")
    .fromTo(tagsRef.value, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, "-=1.0")
    .fromTo(
      ctaRef.value,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1 },
      "-=0.9",
    );
});

onUnmounted(() => {
  cleanup?.();
});
</script>

<template>
  <section
    class="relative h-screen w-full flex flex-col overflow-hidden bg-background"
  >
    <canvas
      ref="canvasRef"
      class="absolute inset-0 pointer-events-none"
    ></canvas>

    <!-- Content zone — grows to fill all space except the scroll indicator row -->
    <div class="flex-1 container-wide relative z-10 flex items-center pt-24">
      <div class="max-w-5xl w-full">
        <!-- Tagline -->
        <div ref="subtitleRef" class="flex items-center gap-4 mb-8 opacity-0">
          <div class="w-12 h-0.5 bg-accent"></div>
          <span class="text-accent text-xs font-bold uppercase tracking-[0.4em]"
            >Rohan Jadav · Frontend Developer</span
          >
        </div>

        <!-- Main Title -->
        <h1
          ref="titleRef"
          class="font-black text-white opacity-0 mb-6"
          style="
            font-size: clamp(2.8rem, 9vw, 8rem);
            letter-spacing: var(--tracking-hero);
            line-height: 0.9;
          "
        >
          Hi, I'm<br />
          <span class="text-gradient">Rohan</span><br />
          Jadav.
        </h1>

        <!-- Description -->
        <p
          ref="descRef"
          class="text-muted text-lg md:text-xl max-w-2xl font-medium leading-relaxed opacity-0 mb-8"
        >
          I craft fast, beautiful, and pixel-perfect web experiences using
          modern tools like React.js, Tailwind CSS, and ES6+ JavaScript.
        </p>

        <!-- Skill Tags -->
        <div ref="tagsRef" class="flex flex-wrap gap-3 mb-10 opacity-0">
          <span
            v-for="skill in [
              'HTML5',
              'Tailwind CSS',
              'JavaScript ES6+',
              'React.js',
            ]"
            :key="skill"
            class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-muted hover:border-accent hover:text-accent transition-all duration-300"
          >
            {{ skill }}
          </span>
        </div>

        <!-- CTAs -->
        <div ref="ctaRef" class="flex flex-wrap items-center gap-6 opacity-0">
          <router-link
            to="/projects"
            class="group flex items-center gap-3 px-10 py-5 bg-white text-black font-black rounded-full relative overflow-hidden transition-all duration-500 hover:pr-14 shrink-0"
          >
            <span class="relative z-10 text-xs uppercase tracking-widest"
              >View Projects</span
            >
            <span
              class="absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 z-10"
              >↗</span
            >
            <div
              class="absolute inset-0 bg-neon origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
            ></div>
          </router-link>

          <a
            href="/Frontend_Resume.pdf"
            download="Rohan_Jadav_Resume.pdf"
            class="group flex items-center gap-3 px-8 py-5 border border-white/15 text-white font-black rounded-full hover:bg-white hover:text-black transition-all duration-500 shrink-0"
          >
            <span class="text-xs uppercase tracking-widest">Download CV</span>
          </a>

          <router-link
            to="/contact"
            class="text-xs font-bold uppercase tracking-widest text-muted hover:text-white transition-colors duration-300 group flex items-center gap-2"
          >
            Get In Touch
            <span
              class="group-hover:translate-x-1 transition-transform duration-300"
              >→</span
            >
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-gradient {
  background: var(--background-image-accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
