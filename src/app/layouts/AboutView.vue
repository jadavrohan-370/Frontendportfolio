<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroRef = ref<HTMLElement | null>(null);
const timelineRef = ref<HTMLElement | null>(null);

const journey = [
  {
    year: "2022",
    title: "The Spark",
    desc: "Discovered web development by accident — opened DevTools out of curiosity and got completely hooked. Built my first HTML page that same night.",
    icon: "🔥",
    color: "#E34F26",
  },
  {
    year: "2023",
    title: "Learning the Craft",
    desc: "Deep-dived into HTML5 semantics, CSS Flexbox & Grid, and vanilla JavaScript. Completed over 50 mini-projects and fell in love with the creative process.",
    icon: "📚",
    color: "#F7DF1E",
  },
  {
    year: "2023",
    title: "Discovering React",
    desc: "Learned React.js and everything changed. Component-based thinking, hooks, and the ecosystem opened up a new world of building scalable UIs.",
    icon: "⚛️",
    color: "#61DAFB",
  },
  {
    year: "2024",
    title: "Going Professional",
    desc: "Started taking on real-world projects. Built e-commerce apps, SaaS dashboards, and API-powered tools. Adopted Tailwind CSS and never looked back.",
    icon: "🚀",
    color: "#7F5AF0",
  },
  {
    year: "2025",
    title: "Levelling Up",
    desc: "Focused on performance, accessibility, and pixel-perfect design execution. Explored animations, WebGL, and building truly delightful user experiences.",
    icon: "✨",
    color: "#00F5D4",
  },
  {
    year: "Now",
    title: "Always Building",
    desc: "Continuously pushing the frontier — contributing to open source, mentoring beginners, and looking for exciting opportunities to collaborate.",
    icon: "🎯",
    color: "#2CB67D",
  },
];

const values = [
  {
    title: "Clean Code",
    desc: "Readable, maintainable code is a feature. I write code that teams love to work with.",
    icon: "🧹",
  },
  {
    title: "User First",
    desc: "Performance and accessibility aren't afterthoughts — they're built in from day one.",
    icon: "👤",
  },
  {
    title: "Never Stop Learning",
    desc: "Frontend moves fast. I stay curious, experiment constantly, and embrace new tools.",
    icon: "🌱",
  },
  {
    title: "Ship It",
    desc: "Done is better than perfect. I balance quality with velocity to deliver real impact.",
    icon: "📦",
  },
];

onMounted(() => {
  if (heroRef.value) {
    gsap.from(heroRef.value.children, {
      y: 60,
      opacity: 0,
      duration: 1.5,
      stagger: 0.15,
      ease: "expo.out",
      delay: 0.3,
    });
  }

  if (timelineRef.value) {
    const items = timelineRef.value.querySelectorAll(".timeline-item");
    items.forEach((item) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 85%" },
        x: -40,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });
    });
  }
});
</script>

<template>
  <div class="page-wrapper pt-24">
    <!-- Hero -->
    <section class="py-24 px-6">
      <div class="container-wide">
        <div ref="heroRef">
          <span class="section-label"
            >Rohan Jadav · The Developer Behind The Screen</span
          >
          <h1
            class="text-6xl md:text-9xl font-black mb-8"
            style="letter-spacing: var(--tracking-hero); line-height: 0.9"
          >
            About<br /><span class="text-gradient">Me.</span>
          </h1>
          <p
            class="text-muted text-xl md:text-2xl max-w-3xl leading-relaxed font-medium"
          >
            I'm <strong class="text-white">Rohan Jadav</strong>, a Frontend
            Developer obsessed with building web experiences that are fast,
            beautiful, and intuitive. I believe great UI is invisible — users
            don't think about it, they just enjoy it.
          </p>
        </div>
      </div>
    </section>

    <!-- Journey Timeline -->
    <section class="py-24 px-6">
      <div class="container-wide">
        <span class="section-label">My Journey</span>
        <h2
          class="text-4xl md:text-6xl font-black mb-20"
          style="letter-spacing: var(--tracking-hero)"
        >
          From Curious <span class="text-white/20">to Capable</span>
        </h2>

        <div ref="timelineRef" class="relative">
          <!-- Timeline Line -->
          <div
            class="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block"
          ></div>

          <div class="space-y-16">
            <div
              v-for="(item, i) in journey"
              :key="i"
              class="timeline-item relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
              :class="i % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse'"
            >
              <!-- Content -->
              <div
                class="glass-card p-8 transition-all duration-500 hover:border-white/20"
                :class="i % 2 === 0 ? 'md:order-1' : 'md:order-2'"
              >
                <div
                  class="flex items-center gap-3 mb-4"
                  :class="i % 2 === 0 ? 'md:flex-row-reverse' : ''"
                >
                  <span class="text-3xl">{{ item.icon }}</span>
                  <span
                    class="text-xs font-black uppercase tracking-widest"
                    :style="{ color: item.color }"
                    >{{ item.year }}</span
                  >
                </div>
                <h3 class="text-2xl font-black mb-3">{{ item.title }}</h3>
                <p class="text-muted text-sm leading-loose">{{ item.desc }}</p>
              </div>

              <!-- Timeline Dot (visible on md+) -->
              <div
                class="hidden md:flex items-center justify-center"
                :class="i % 2 === 0 ? 'md:order-2' : 'md:order-1'"
              >
                <div
                  class="w-4 h-4 rounded-full border-2 border-current"
                  :style="{
                    color: item.color,
                    boxShadow: `0 0 20px ${item.color}60`,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-24 px-6 bg-surface/20">
      <div class="container-wide">
        <span class="section-label">What I Believe In</span>
        <h2
          class="text-4xl md:text-6xl font-black mb-16"
          style="letter-spacing: var(--tracking-hero)"
        >
          My <span class="text-gradient">Principles</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="value in values"
            :key="value.title"
            class="glass-card p-10 group cursor-none hover:border-white/20 transition-all duration-500"
          >
            <div
              class="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500 inline-block"
            >
              {{ value.icon }}
            </div>
            <h3 class="text-2xl font-black mb-3">{{ value.title }}</h3>
            <p class="text-muted leading-relaxed">{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-32 px-6 text-center">
      <div class="container-wide max-w-3xl">
        <h2
          class="text-5xl md:text-7xl font-black mb-8"
          style="letter-spacing: var(--tracking-hero)"
        >
          Let's Build<br /><span class="text-gradient">Together.</span>
        </h2>
        <p class="text-muted text-xl mb-12 leading-relaxed">
          Have a project in mind? I'd love to hear about it and help bring it to
          life.
        </p>
        <router-link
          to="/contact"
          class="group inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-black rounded-full relative overflow-hidden transition-all duration-500 text-lg"
        >
          <span class="relative z-10">Start a Conversation</span>
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
