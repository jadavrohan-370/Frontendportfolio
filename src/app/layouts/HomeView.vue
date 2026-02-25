<script setup lang="ts">
import HeroSection from "../../features/hero/HeroSection.vue";
import TechStack from "../../features/techstack/TechStack.vue";
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSEO } from "../../shared/composables/useSEO";

gsap.registerPlugin(ScrollTrigger);

// Set SEO meta tags for home page
useSEO({
  title: "Home",
  description: "Rohan Jadav - Full Stack Developer. Browse my portfolio of modern web development projects built with React, Vue.js, JavaScript, and Tailwind CSS.",
  keywords: "web developer, React projects, Vue.js projects, JavaScript development, portfolio",
  ogTitle: "Rohan Jadav - Full Stack Developer Portfolio",
  ogDescription: "Explore featured web development projects and creative web applications",
  ogImage: "https://rohanportfolio-six.vercel.app/Portfoliopic.png",
});

// Featured projects
const featured = [
  {
    title: "RJClothStore",
    category: "E-commerce App",
    stack: ["HTML", "Tailwind CSS", "JavaScript"],
    image: "./public/RJ.png",
    color: "#61DAFB",
    desc: "RJClothStore is a fully responsive e-commerce web application built with semantic HTML5, modern Tailwind CSS styling, and vanilla JavaScript for dynamic interactions. Features include product category filtering, shopping cart functionality, responsive grid layouts, and a clean user interface optimized for both desktop and mobile devices. This project demonstrates core web development skills including DOM manipulation, event handling, and CSS styling techniques.",
    live: "https://clothe-store-delta.vercel.app/",
    github: "https://github.com/jadavrohan-370/Clothe_Store",
    href: "/projects",
  },
  {
    title: "Food Information Website",
    category: "Informative Website about the Products",
    stack: ["React.js", "Tailwind CSS"],
    image: "./public/Foorwebsite.png",
    color: "#7F5AF0",
    desc: "A modern food and restaurant information website built with React.js and Tailwind CSS. This project features a responsive design showcasing food products, restaurant details, and comprehensive menus. Includes component-based architecture, dynamic content rendering, and a professional layout with dedicated sections for menu items, restaurant information, and customer contact details. Built with component reusability and performance optimization in mind.",
    live: "https://bhartifood.vercel.app/",
    github: "https://github.com/jadavrohan-370/WEBSITEDEMO",
    href: "/projects",
  },
  {
    title: "Portfolio Website",
    category: "Full Portfolio Showcase",
    stack: ["React.js", "Tailwind CSS", "Routing"],
    image: "./public/Portfoliopic.png",
    color: "#00F5D4",
    desc: "A professional portfolio website showcasing web development projects and skills. Built with React.js for dynamic routing and component management, styled with Tailwind CSS for a modern design system. Includes multiple sections: project showcase with filtering, detailed skills and technology stack, about section, and contact information. Demonstrates routing, state management, and responsive web design best practices for frontend development.",
    live: "https://rohan-portfolio-website.vercel.app/",
    github: "https://github.com/jadavrohan-370/Frontendportfolio",
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
            <h1
              class="text-5xl md:text-7xl font-black"
              style="letter-spacing: var(--tracking-hero)"
            >
              Featured<br /><span class="text-white/20">Projects</span>
            </h1>
          </div>
          <router-link
            to="/projects"
            class="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted hover:text-[#0300F5D4] transition-colors duration-300"
          >
            View All Work
            <span
              class="group-hover:translate-x-2 transition-transform duration-300"
              >→</span
            >
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(project, i) in featured"
            :key="project.title"
            :ref="
              (el) => {
                if (el) cardRefs[i] = el as HTMLElement;
              }
            "
            class="group glass-card overflow-hidden cursor-none flex flex-col"
          >
            <!-- Image -->
            <div class="relative aspect-video overflow-hidden">
              <img
                :src="project.image"
                :alt="`${project.title} - ${project.category} project screenshot`"
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-1000"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"
              ></div>

              <!-- Stack badges -->
              <div class="absolute top-4 left-4 flex flex-wrap gap-2">
                <span
                  v-for="tech in project.stack"
                  :key="tech"
                  class="px-2 py-1 rounded-full text-[10px] font-white uppercase tracking-wider bg-zinc-900/30 backdrop-blur-md border border-white/10 text-white/70"
                  >{{ tech }}</span
                >
              </div>

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

            <!-- Content -->
            <div class="p-6 flex flex-col flex-1">
              <p class="text-sm text-muted leading-relaxed mb-6 flex-1">
                {{ project.desc }}
              </p>

              <!-- Links -->
              <div class="flex items-center gap-4 flex-wrap mb-6">
                <a
                  :href="project.live"
                  target="_blank"
                  class="group/btn flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                >
                  Live Demo
                  <span class="group-hover/btn:translate-x-0.5 transition-transform">↗</span>
                </a>
                <a
                  :href="project.github"
                  target="_blank"
                  class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  GitHub
                  <span>→</span>
                </a>
              </div>

              <!-- Accent bar -->
              <div
                class="h-0.5 w-0 group-hover:w-full transition-all duration-700"
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
              I'm <strong class="text-text">Rohan Jadav</strong>, a passionate
              Frontend Developer who transforms ideas into responsive,
              high-performance web applications. I love the intersection of
              clean code and beautiful design.
            </p>
            <router-link
              to="/about"
              class="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/15 text-sm font-bold uppercase tracking-widest hover:bg-[#001ddd] hover:text-white hover:scale-3d transition-all duration-500"
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
