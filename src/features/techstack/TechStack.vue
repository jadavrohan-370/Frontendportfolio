<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techs = [
  {
    name: "HTML5",
    category: "Markup",
    icon: "🧱",
    color: "#E34F26",
    desc: "Semantic, accessible, standards-compliant markup.",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    icon: "🌊",
    color: "#38bdf8",
    desc: "Utility-first CSS for rapid, consistent UI building.",
  },
  {
    name: "JavaScript",
    category: "ES6+ Logic",
    icon: "⚡",
    color: "#F7DF1E",
    desc: "Modern JS — async/await, modules, destructuring & more.",
  },
  {
    name: "React.js",
    category: "Framework",
    icon: "⚛️",
    color: "#61DAFB",
    desc: "Component-based UIs with hooks, context & state management.",
  },
  {
    name: "Git & GitHub",
    category: "Workflow",
    icon: "🐙",
    color: "#ffffff",
    desc: "Version control, branching, and collaborative coding.",
  },
  {
    name: "Responsive Design",
    category: "UX",
    icon: "📱",
    color: "#7F5AF0",
    desc: "Mobile-first layouts that look great on every screen.",
  },
];

const props = defineProps<{ id?: string }>();
const cards = ref<HTMLElement[]>([]);
const isMobile = ref(false);

const onMouseMove = (e: MouseEvent, index: number) => {
  const card = cards.value[index];
  if (!card || isMobile.value) return;
  const { left, top, width, height } = card.getBoundingClientRect();
  const rotateX = (e.clientY - top - height / 2) / 12;
  const rotateY = (width / 2 - (e.clientX - left)) / 12;
  gsap.to(card, {
    rotateX,
    rotateY,
    duration: 0.5,
    ease: "power3.out",
    transformPerspective: 1000,
  });
};

const onMouseLeave = (index: number) => {
  const card = cards.value[index];
  if (card) {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
  }
};

onMounted(() => {
  isMobile.value = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  gsap.from(cards.value, {
    scrollTrigger: { trigger: ".tech-grid", start: "top 80%" },
    y: 80,
    opacity: 0,
    duration: 1.2,
    stagger: 0.12,
    ease: "power4.out",
  });
});
</script>

<template>
  <section :id="props.id" class="py-32 px-6 bg-surface/30">
    <div class="container-wide">
      <div class="mb-24">
        <span class="section-label">What I Work With</span>
        <h3
          class="text-5xl md:text-7xl font-black"
          style="letter-spacing: var(--tracking-hero)"
        >
          My <span class="text-gradient">Skills</span>
        </h3>
        <p
          class="text-muted text-lg max-w-2xl font-medium mt-8 leading-relaxed"
        >
          Technologies I've honed to build fast, beautiful, and user-friendly
          web experiences.
        </p>
      </div>

      <div
        class="tech-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="(tech, index) in techs"
          :key="tech.name"
          :ref="
            (el) => {
              if (el) cards[index] = el as HTMLElement;
            }
          "
          class="glass-card p-10 flex flex-col justify-between group cursor-none"
          style="height: 22rem"
          @mousemove="onMouseMove($event, index)"
          @mouseleave="onMouseLeave(index)"
        >
          <!-- Top row -->
          <div class="flex justify-between items-start">
            <span
              class="text-5xl transition-transform duration-500 group-hover:scale-125"
              >{{ tech.icon }}</span
            >
            <span
              class="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20 group-hover:text-accent transition-colors duration-500"
              >{{ tech.category }}</span
            >
          </div>

          <!-- Description -->
          <p
            class="text-muted text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0"
          >
            {{ tech.desc }}
          </p>

          <!-- Bottom -->
          <div>
            <h4 class="text-2xl font-black mb-3 uppercase tracking-tight">
              {{ tech.name }}
            </h4>
            <div
              class="h-0.5 w-8 transition-all duration-700 group-hover:w-full"
              :style="{ backgroundColor: tech.color }"
            ></div>
          </div>

          <!-- Ambient glow -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none rounded-custom"
            :style="{
              background: `radial-gradient(circle at 30% 70%, ${tech.color}, transparent 70%)`,
            }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.glass-card {
  transform-style: preserve-3d;
}
.text-gradient {
  background: var(--background-image-accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
