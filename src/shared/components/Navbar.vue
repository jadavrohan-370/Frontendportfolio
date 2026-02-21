<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const route = useRoute();

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  gsap.from(".nav-item", {
    y: -30,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power4.out",
    delay: 0.3,
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav
    class="fixed top-0 inset-x-0 z-100 transition-all duration-700"
    :class="
      isScrolled
        ? 'py-4 bg-background/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl'
        : 'py-8'
    "
  >
    <div class="container-wide flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="nav-item flex items-center gap-3 group">
        <div
          class="w-10 h-10 rounded-xl bg-accent flex items-center justify-center font-black text-sm text-white group-hover:bg-neon group-hover:text-black transition-all duration-500 tracking-tighter"
        >
          RJ
        </div>
        <span class="font-display font-black text-xl tracking-tight"
          >ROHAN<span class="text-accent">.</span></span
        >
      </router-link>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-10">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          class="nav-item text-sm font-bold uppercase tracking-widest relative group transition-colors duration-300"
          :class="
            route.path === link.path
              ? 'text-white'
              : 'text-muted hover:text-white'
          "
        >
          {{ link.name }}
          <span
            class="absolute -bottom-1.5 left-0 h-0.5 bg-accent transition-all duration-500"
            :class="
              route.path === link.path ? 'w-full' : 'w-0 group-hover:w-full'
            "
          ></span>
        </router-link>
      </div>

      <!-- CTA Section -->
      <div class="nav-item flex items-center gap-4 lg:gap-8">
        <!-- Resume Link -->
        <a
          href="/Frontend_Resume.pdf"
          download="Rohan_Jadav_Resume.pdf"
          class="hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted hover:text-white transition-all duration-300 group/cv"
        >
          <span
            class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/cv:border-accent group-hover/cv:text-accent transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </span>
          Resume
        </a>

        <!-- Hire Me -->
        <router-link
          to="/contact"
          class="hidden md:flex px-7 py-3 rounded-full border border-white/15 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm shadow-lg hover:shadow-white/5"
        >
          Hire Me
        </router-link>

        <!-- Mobile Hamburger -->
        <button
          class="md:hidden flex flex-col gap-1.5 p-2"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <span
            class="w-6 h-0.5 bg-white transition-all duration-300"
            :class="isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''"
          ></span>
          <span
            class="w-6 h-0.5 bg-white transition-all duration-300"
            :class="isMobileMenuOpen ? 'opacity-0' : ''"
          ></span>
          <span
            class="w-6 h-0.5 bg-white transition-all duration-300"
            :class="isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''"
          ></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-full inset-x-0 bg-background/95 backdrop-blur-2xl border-b border-white/5 px-6 py-8 flex flex-col gap-6"
      >
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          class="text-2xl font-black uppercase tracking-tight hover:text-accent transition-colors duration-300"
          :class="route.path === link.path ? 'text-accent' : 'text-white'"
          @click="isMobileMenuOpen = false"
        >
          {{ link.name }}
        </router-link>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
