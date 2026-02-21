<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "ShopSwift",
    category: "E-commerce App",
    stack: ["React.js", "Tailwind CSS", "Context API"],
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1200",
    color: "#61DAFB",
    desc: "A full-featured e-commerce storefront with cart management, product filtering, and a slick checkout UX. Built with React and Context API for state management.",
    live: "#",
    github: "#",
  },
  {
    title: "TaskFlow",
    category: "Productivity App",
    stack: ["React.js", "Tailwind CSS", "LocalStorage"],
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=1200",
    color: "#7F5AF0",
    desc: "A Kanban-inspired task management app with drag-and-drop support, priority labels, and deadline tracking. Clean design, zero dependencies.",
    live: "#",
    github: "#",
  },
  {
    title: "WeatherNow",
    category: "API Integration",
    stack: ["JavaScript ES6+", "HTML5", "OpenWeather API"],
    image:
      "https://images.unsplash.com/photo-1504608524841-42584120d094?auto=format&fit=crop&q=80&w=1200",
    color: "#00F5D4",
    desc: "A location-aware weather dashboard that pulls real-time data from the OpenWeather API. Animated weather icons and 7-day forecast.",
    live: "#",
    github: "#",
  },
  {
    title: "DevBlog",
    category: "Blog Platform",
    stack: ["React.js", "Tailwind CSS", "Markdown"],
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200",
    color: "#2CB67D",
    desc: "A minimal, fast developer blog with markdown support, dark mode, and syntax-highlighted code blocks. Focuses on readability.",
    live: "#",
    github: "#",
  },
  {
    title: "CryptoTrack",
    category: "Dashboard / Data Viz",
    stack: ["React.js", "Chart.js", "CoinGecko API"],
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200",
    color: "#F7DF1E",
    desc: "A real-time cryptocurrency price tracker with live charts, portfolio watchlist, and percentage change animations.",
    live: "#",
    github: "#",
  },
  {
    title: "QuizMaster",
    category: "Interactive UI",
    stack: ["JavaScript ES6+", "HTML5", "CSS3"],
    image:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1200",
    color: "#E34F26",
    desc: "A multi-category quiz game with timer, score tracking, and animated results — pure vanilla JS, no frameworks.",
    live: "#",
    github: "#",
  },
];

const cardRefs = ref<HTMLElement[]>([]);

onMounted(() => {
  cardRefs.value.forEach((card) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: "top 88%" },
      y: 80,
      opacity: 0,
      duration: 1.4,
      ease: "expo.out",
    });
  });
});
</script>

<template>
  <div class="page-wrapper pt-24">
    <!-- Header -->
    <section class="py-24 px-6">
      <div class="container-wide">
        <span class="section-label">My Work</span>
        <h1
          class="text-6xl md:text-9xl font-black mb-8"
          style="letter-spacing: var(--tracking-hero); line-height: 0.9"
        >
          Projects<br /><span class="text-gradient">Showcase.</span>
        </h1>
        <p class="text-muted text-xl max-w-2xl leading-relaxed font-medium">
          A collection of web applications I've designed and built — from
          interactive UIs to API-powered tools and full-stack apps.
        </p>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="pb-32 px-6">
      <div class="container-wide">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="(project, i) in projects"
            :key="project.title"
            :ref="
              (el) => {
                if (el) cardRefs[i] = el as HTMLElement;
              }
            "
            class="glass-card group cursor-none overflow-hidden"
          >
            <!-- Image -->
            <div class="relative aspect-video overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-1000"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"
              ></div>

              <!-- Stack badges -->
              <div class="absolute top-4 left-4 flex flex-wrap gap-2">
                <span
                  v-for="tech in project.stack"
                  :key="tech"
                  class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/50 backdrop-blur-md border border-white/10"
                  >{{ tech }}</span
                >
              </div>
            </div>

            <!-- Content -->
            <div class="p-8">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <p
                    class="text-xs font-bold uppercase tracking-widest mb-2"
                    :style="{ color: project.color }"
                  >
                    {{ project.category }}
                  </p>
                  <h3 class="text-3xl font-black">{{ project.title }}</h3>
                </div>
              </div>

              <p class="text-muted text-sm leading-relaxed mb-8">
                {{ project.desc }}
              </p>

              <!-- Links -->
              <div class="flex items-center gap-6">
                <a
                  :href="project.live"
                  class="group/btn flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
                >
                  Live Demo
                  <span
                    class="group-hover/btn:translate-x-0.5 transition-transform"
                    >↗</span
                  >
                </a>
                <a
                  :href="project.github"
                  class="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted hover:text-white transition-colors duration-300"
                >
                  GitHub
                  <span>→</span>
                </a>
              </div>

              <!-- Accent bar -->
              <div
                class="h-0.5 w-0 group-hover:w-full transition-all duration-700 mt-6"
                :style="{ backgroundColor: project.color }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 px-6 border-t border-white/5 text-center">
      <div class="container-wide max-w-2xl">
        <h2
          class="text-4xl md:text-6xl font-black mb-6"
          style="letter-spacing: var(--tracking-hero)"
        >
          Got a Project?
        </h2>
        <p class="text-muted text-lg mb-10">
          Let's collaborate and build something people love to use.
        </p>
        <router-link
          to="/contact"
          class="group inline-flex items-center gap-3 px-10 py-5 bg-accent text-white font-black rounded-full relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(127,90,240,0.5)]"
        >
          <span class="relative z-10">Let's Talk</span>
          <div
            class="absolute inset-0 bg-neon origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
          ></div>
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-16 border-t border-white/5">
      <div
        class="container-wide flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <p class="text-muted text-sm">&copy; 2026 · Built with passion</p>
        <div class="flex gap-8">
          <a
            href="https://github.com"
            target="_blank"
            class="text-xs font-bold uppercase tracking-widest text-muted hover:text-neon transition-colors"
            >GitHub</a
          >
          <a
            href="https://linkedin.com"
            target="_blank"
            class="text-xs font-bold uppercase tracking-widest text-muted hover:text-neon transition-colors"
            >LinkedIn</a
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
