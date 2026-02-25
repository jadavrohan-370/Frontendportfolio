<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSEO } from "../../shared/composables/useSEO";

gsap.registerPlugin(ScrollTrigger);

// Set SEO meta tags for projects page
useSEO({
  title: "Projects",
  description: "Browse my portfolio of web development projects. Featured work includes e-commerce applications, food websites, and portfolio showcases built with React, Vue.js, JavaScript, and modern CSS.",
  keywords: "web projects, portfolio projects, React projects, JavaScript projects, e-commerce website, web development portfolio",
  ogTitle: "My Projects - Rohan Jadav - Full Stack Developer",
  ogDescription: "View my latest web development projects and applications",
  ogImage: "https://rohanportfolio-six.vercel.app/Portfoliopic.png",
  canonical: "https://rohanportfolio-six.vercel.app/projects",
});

const projects = [
  {
    title: "RJClothStore",
    category: "E-commerce App",
    stack: ["HTML", "Tailwind CSS", "JavaScript "],
    image: "./public/RJ.png",
    color: "#61DAFB",
    desc: "RJClothStore is a fully responsive e-commerce web application built with semantic HTML5, modern Tailwind CSS styling, and vanilla JavaScript for dynamic interactions. Features include product category filtering, shopping cart functionality, responsive grid layouts, and a clean user interface optimized for both desktop and mobile devices. This project demonstrates core web development skills including DOM manipulation, event handling, and CSS styling techniques.",
    live: "https://clothe-store-delta.vercel.app/",
    github: "https://github.com/jadavrohan-370/Clothe_Store",
  },
  {
    title: "Food Information Website",
    category: " Informative Website about the Products",
    stack: ["React.js", "Tailwind CSS"],
    image: "./public/Foorwebsite.png",
    color: "#7F5AF0",
    desc: "A modern food and restaurant information website built with React.js and Tailwind CSS. This project features a responsive design showcasing food products, restaurant details, and comprehensive menus. Includes component-based architecture, dynamic content rendering, and a professional layout with dedicated sections for menu items, restaurant information, and customer contact details. Built with component reusability and performance optimization in mind.",
    live: "https://bhartifood.vercel.app/",
    github: "https://github.com/jadavrohan-370/WEBSITEDEMO",
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
                :alt="`${project.title} - ${project.category} project screenshot`"
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
                  class="px-3 py-1 rounded-full text-[10px] font-white uppercase tracking-wider bg-zinc-900/20 backdrop-blur-md border border-white/10 text-white/80 group-hover:text-white transition-colors duration-500"
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
                  class="group/btn flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider border border-amber-400/50 hover:bg-accent-red hover:text-accent-gold transition-all duration-300"
                >
                  Live Demo
                  <span
                    class="group-hover/btn:translate-x-0.5 transition-transform"
                    >↗</span
                  >
                </a>
                <a
                  :href="project.github"
                  class="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:bg-red-600 p-4 rounded-full text-blue-600 hover:text-white transition-colors duration-300 hover:shadow-[0_0_20px_rgba(240,80,50,0.5)]"
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
