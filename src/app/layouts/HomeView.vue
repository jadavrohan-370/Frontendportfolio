<script setup lang="ts">
import HeroSection from "../../features/hero/HeroSection.vue";
import TechStack from "../../features/techstack/TechStack.vue";
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Featured projects (3 highlights only — full list on /projects)
const featured = [
  {
    title: "ShopSwift",
    category: "E-commerce / React.js",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1200",
    color: "#61DAFB",
    href: "/projects",
  },
  {
    title: "TaskFlow",
    category: "Productivity App / React.js",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=1200",
    color: "#7F5AF0",
    href: "/projects",
  },
  {
    title: "WeatherNow",
    category: "API Integration / JS ES6+",
    image:
      "https://images.unsplash.com/photo-1504608524841-42584120d094?auto=format&fit=crop&q=80&w=1200",
    color: "#00F5D4",
    href: "/projects",
  },
];

const cardRefs = ref<HTMLElement[]>([]);

onMounted(() => {
  cardRefs.value.forEach((card) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: "top 88%" },
      y: 100,
      opacity: 0,
      duration: 1.4,
      ease: "expo.out",
    });
  });
});
</script>

<template>
  <div class="page-wrapper">
    <HeroSection />

    <!-- Featured Projects Teaser -->
    <section class="py-32 px-6">
      <div class="container-wide">
        <div
          class="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6"
        >
          <div>
            <span class="section-label">Recent Work</span>
            <h2
              class="text-5xl md:text-7xl font-black"
              style="letter-spacing: var(--tracking-hero)"
            >
              Featured<br /><span class="text-white/20">Projects</span>
            </h2>
          </div>
          <router-link
            to="/projects"
            class="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted hover:text-white transition-colors duration-300"
          >
            View All Work
            <span
              class="group-hover:translate-x-2 transition-transform duration-300"
              >→</span
            >
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(project, i) in featured"
            :key="project.title"
            :ref="
              (el) => {
                if (el) cardRefs[i] = el as HTMLElement;
              }
            "
            class="group glass-card overflow-hidden cursor-none"
          >
            <div class="relative aspect-4/3 overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-1000"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-60"
              ></div>
              <div class="absolute bottom-0 inset-x-0 p-6">
                <p
                  class="text-xs uppercase tracking-widest font-bold mb-1"
                  :style="{ color: project.color }"
                >
                  {{ project.category }}
                </p>
                <h3 class="text-2xl font-black">{{ project.title }}</h3>
              </div>
            </div>
            <div class="p-6">
              <router-link
                :to="project.href"
                class="group/link flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted hover:text-white transition-colors duration-300"
              >
                View Project
                <span
                  class="group-hover/link:translate-x-1 transition-transform duration-300"
                  >↗</span
                >
              </router-link>
              <div
                class="h-0.5 w-0 group-hover:w-full transition-all duration-700 mt-4"
                :style="{ backgroundColor: project.color }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <TechStack />

    <!-- About Teaser -->
    <section class="py-32 px-6 bg-surface/20">
      <div class="container-wide">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <span class="section-label">About Me</span>
            <h2
              class="text-5xl md:text-7xl font-black mb-8"
              style="letter-spacing: var(--tracking-hero)"
            >
              Code.<br />Create.<br /><span class="text-gradient">Ship.</span>
            </h2>
            <p class="text-muted text-lg leading-relaxed mb-10">
              I'm <strong class="text-white">Rohan Jadav</strong>, a passionate
              Frontend Developer who transforms ideas into responsive,
              high-performance web applications. I love the intersection of
              clean code and beautiful design.
            </p>
            <router-link
              to="/about"
              class="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500"
            >
              My Story
              <span
                class="group-hover:translate-x-1 transition-transform duration-300"
                >→</span
              >
            </router-link>
          </div>
          <div class="glass-card p-10 space-y-6">
            <div
              v-for="(item, i) in [
                { label: 'Projects Completed', value: '20+', color: '#61DAFB' },
                {
                  label: 'Months of Experience',
                  value: '18+',
                  color: '#7F5AF0',
                },
                {
                  label: 'Technologies Mastered',
                  value: '10+',
                  color: '#00F5D4',
                },
                {
                  label: 'GitHub Contributions',
                  value: '500+',
                  color: '#2CB67D',
                },
              ]"
              :key="i"
              class="flex items-center justify-between border-b border-white/5 pb-6 last:border-0 last:pb-0 group cursor-none"
            >
              <span
                class="text-muted text-sm font-bold uppercase tracking-wider"
                >{{ item.label }}</span
              >
              <span
                class="text-4xl font-black transition-colors duration-500"
                :style="{ color: item.color }"
                >{{ item.value }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-16 border-t border-white/5">
      <div
        class="container-wide flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <p class="text-muted text-sm font-medium">
          &copy; 2026 Rohan Jadav &middot; Built with passion
        </p>
        <div class="flex gap-8">
          <a
            href="https://github.com"
            target="_blank"
            class="text-xs font-bold uppercase tracking-widest text-muted hover:text-neon transition-colors duration-300"
            >GitHub</a
          >
          <a
            href="https://linkedin.com"
            target="_blank"
            class="text-xs font-bold uppercase tracking-widest text-muted hover:text-neon transition-colors duration-300"
            >LinkedIn</a
          >
          <a
            href="https://twitter.com"
            target="_blank"
            class="text-xs font-bold uppercase tracking-widest text-muted hover:text-neon transition-colors duration-300"
            >Twitter</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.text-gradient {
  background: var(--background-image-accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
