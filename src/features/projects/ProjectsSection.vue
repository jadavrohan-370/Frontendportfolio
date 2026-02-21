<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Aether Digital',
    category: 'Motion Design / WebGL',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    color: '#7F5AF0',
    description: 'An immersive ecosystem for a next-gen digital agency, featuring fluid shaders and 3D interactions.'
  },
  {
    title: 'Neon Vault',
    category: 'Fintech / Branding',
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200',
    color: '#00F5D4',
    description: 'A revolutionary crypto banking interface with heavy focus on cinematic UI and micro-interactions.'
  },
  {
    title: 'Quantum Labs',
    category: 'Research / VR Site',
    image: 'https://images.unsplash.com/photo-1635776062127-d338bc8ad0ce?auto=format&fit=crop&q=80&w=1200',
    color: '#2CB67D',
    description: 'Pushing the boundaries of spatial computing through a web-based VR experimentation portal.'
  },
  {
    title: 'Solaris OS',
    category: 'Product / Interface',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200',
    color: '#FF6F61',
    description: 'Designing the future of desktop operating systems with a minimalist and fluid design language.'
  }
]

const props = defineProps<{ id?: string }>()
const cardRefs = ref<HTMLElement[]>([])

onMounted(() => {
  cardRefs.value.forEach((card) => {
    if (!card) return

    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 150,
      opacity: 0,
      duration: 1.5,
      ease: 'expo.out'
    })
  })
})

const onMouseEnter = (index: number) => {
  const card = cardRefs.value[index]
  if (!card) return
  
  const img = card.querySelector('img')
  const info = card.querySelector('.project-info')
  const overlay = card.querySelector('.overlay')
  
  if (img) gsap.to(img, { scale: 1.05, duration: 1.5, ease: 'power2.out' })
  if (info) gsap.to(info, { y: -20, opacity: 1, duration: 0.8, ease: 'expo.out' })
  if (overlay) gsap.to(overlay, { opacity: 0.6, duration: 0.8 })
}

const onMouseLeave = (index: number) => {
  const card = cardRefs.value[index]
  if (!card) return
  
  const img = card.querySelector('img')
  const info = card.querySelector('.project-info')
  const overlay = card.querySelector('.overlay')
  
  if (img) gsap.to(img, { scale: 1, duration: 1.5, ease: 'power2.out' })
  if (info) gsap.to(info, { y: 0, opacity: 0.8, duration: 0.8, ease: 'expo.out' })
  if (overlay) gsap.to(overlay, { opacity: 0.2, duration: 0.8 })
}
</script>

<template>
  <section :id="props.id" class="py-32 px-6">
    <div class="container-wide">
      <div class="mb-32">
        <h2 class="text-xs uppercase tracking-[0.5em] font-bold text-accent mb-6">Production</h2>
        <h3 class="text-6xl md:text-8xl font-black max-w-4xl" style="letter-spacing: var(--tracking-hero)">
          Selected <span class="text-white/20">Studio</span> Works
        </h3>
      </div>

      <div class="grid grid-cols-1 gap-40">
        <div 
          v-for="(project, index) in projects" 
          :key="project.title"
          :ref="el => { if (el) cardRefs[index] = el as HTMLElement }"
          class="relative group rounded-custom overflow-hidden bg-surface aspect-video cursor-none"
          @mouseenter="onMouseEnter(index)"
          @mouseleave="onMouseLeave(index)"
        >
          <!-- Media -->
          <img 
            :src="project.image" 
            :alt="project.title"
            class="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-2000 group-hover:grayscale-0"
          >
          
          <!-- Glossy Overlay -->
          <div class="overlay absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-20 transition-opacity duration-1000"></div>

          <!-- Content -->
          <div class="project-info absolute bottom-12 left-12 right-12 z-10 flex flex-col md:flex-row md:items-end justify-between gap-12 pointer-events-none opacity-80 transition-all duration-700">
            <div class="max-w-xl">
              <span class="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">{{ project.category }}</span>
              <h4 class="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none">{{ project.title }}</h4>
              <p class="text-muted text-lg md:text-xl font-medium leading-relaxed max-w-lg">
                {{ project.description }}
              </p>
            </div>
            
            <div class="magnetic w-24 h-24 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700">
              <span class="text-3xl font-light">↗</span>
            </div>
          </div>

          <!-- Hover Reveal Border -->
          <div 
            class="absolute inset-x-0 bottom-0 h-1.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"
            :style="{ backgroundColor: project.color }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rounded-custom {
  border-radius: var(--radius-custom);
}
</style>
