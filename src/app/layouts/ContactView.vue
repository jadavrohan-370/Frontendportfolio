<script setup lang="ts">
import { reactive, ref } from "vue";
import { useSEO } from "../../shared/composables/useSEO";
import {
  Mail,
  Briefcase,
  Github,
  MapPin,
  PartyPopper,
} from "lucide-vue-next";

// Set SEO meta tags for contact page
useSEO({
  title: "Contact",
  description: "Get in touch with Rohan Jadav. Contact me for web development projects, collaborations, or inquiries. I'm available for freelance work and new opportunities.",
  keywords: "contact developer, hire developer, web development services, freelance developer, contact form",
  ogTitle: "Contact Rohan Jadav - Full Stack Developer",
  ogDescription: "Get in touch with me for web development projects and collaborations",
  ogImage: "https://rohanportfolio-six.vercel.app/Portfoliopic.png",
  canonical: "https://rohanportfolio-six.vercel.app/contact",
});

const form = reactive({ name: "", email: "", subject: "", message: "" });
const errors = reactive({ name: "", email: "", subject: "", message: "" });
const isSubmitting = ref(false);
const isSuccess = ref(false);

const validate = () => {
  let valid = true;
  errors.name = form.name.trim() ? "" : "Name is required.";
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? ""
    : "A valid email is required.";
  errors.subject = form.subject.trim() ? "" : "Subject is required.";
  errors.message =
    form.message.trim().length >= 20
      ? ""
      : "Message must be at least 20 characters.";
  if (errors.name || errors.email || errors.subject || errors.message)
    valid = false;
  return valid;
};

const handleSubmit = async () => {
  if (!validate()) return;
  isSubmitting.value = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        from_name: "Portfolio Contact Form",
      }),
    });

    const result = await response.json();
    if (result.success) {
      isSuccess.value = true;
      resetForm();
    } else {
      alert("Something went wrong. Please try again or email me directly.");
    }
  } catch (error) {
    alert("Failed to send message. Check your connection.");
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  Object.assign(form, { name: "", email: "", subject: "", message: "" });
  isSuccess.value = false;
};

const contactInfo = [
  {
    label: "Email",
    value: "rohanjadav51@gmail.com",
    icon: Mail,
    link: "mailto:rohanjadav51@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rohan-jadav-3648a4381",
    icon: Briefcase,
    link: "https://www.linkedin.com/in/rohan-jadav-3648a4381",
  },
  {
    label: "GitHub",
    value: "github.com/jadavrohan-370",
    icon: Github,
    link: "https://github.com/jadavrohan-370",
  },
  { label: "Location", value: "Gujarat, India", icon: MapPin, link: "#" },
];
</script>

<template>
  <div class="page-wrapper pt-24">
    <!-- Header -->
    <section class="py-24 px-6">
      <div class="container-wide">
        <span class="section-label">Get In Touch</span>
        <h1
          class="text-6xl md:text-9xl font-black mb-8"
          style="letter-spacing: var(--tracking-hero); line-height: 0.9"
        >
          Let's<br /><span class="text-gradient">Talk.</span>
        </h1>
        <p class="text-muted text-xl max-w-2xl leading-relaxed font-medium">
          Whether you have a project idea, a job opportunity, or just want to
          connect — my inbox is always open. Let's build something great
          together.
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="pb-32 px-6">
      <div
        class="container-wide grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start"
      >
        <!-- Contact Info Sidebar -->
        <div class="lg:col-span-2 space-y-6">
          <div
            v-for="info in contactInfo"
            :key="info.label"
            class="glass-card p-6 group cursor-none hover:border-white/20 transition-all duration-500"
          >
            <a
              :href="info.link"
              target="_blank"
              class="flex items-center gap-5"
            >
              <component
                :is="info.icon"
                class="w-6 h-6 group-hover:scale-110 transition-transform duration-300 shrink-0"
              />
              <div>
                <p
                  class="text-xs font-bold uppercase tracking-widest text-muted mb-1"
                >
                  {{ info.label }}
                </p>
                <p
                  class="text-sm font-bold text-white group-hover:text-accent transition-colors duration-300"
                >
                  {{ info.value }}
                </p>
              </div>
            </a>
          </div>

          <!-- Availability Badge -->
          <div class="glass-card p-6">
            <div class="flex items-center gap-3">
              <div
                class="w-3 h-3 rounded-full bg-green-400 animate-pulse"
              ></div>
              <p class="text-sm font-bold text-white">
                Available for Freelance & Full-time
              </p>
            </div>
            <p class="text-muted text-xs mt-2 leading-relaxed">
              Currently open to new opportunities. Typical response time:
              <strong class="text-white">within 24 hours.</strong>
            </p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-3">
          <!-- Success State -->
          <div v-if="isSuccess" class="glass-card p-12 text-center">
            <PartyPopper class="w-16 h-16 mx-auto mb-6 text-accent" />
            <h3 class="text-3xl font-black mb-4">Message Sent!</h3>
            <p class="text-muted leading-relaxed mb-8">
              Thanks for reaching out! I'll get back to you within 24 hours.
            </p>
            <button
              @click="resetForm"
              class="px-8 py-4 rounded-full border border-white/15 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500"
            >
              Send Another Message
            </button>
          </div>

          <!-- Form -->
          <form
            v-else
            @submit.prevent="handleSubmit"
            class="glass-card p-10 space-y-6"
          >
            <h2 class="text-2xl font-black mb-8">Send a Message</h2>

            <!-- Name & Email -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  class="block text-xs font-bold uppercase tracking-widest text-muted mb-2"
                  >Your Name</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="your Name"
                  class="w-full bg-slate-100 border border-slate-300 rounded-xl px-5 py-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent transition-all duration-300 text-sm font-medium"
                  :class="errors.name ? 'border-red-500/60' : ''"
                />
                <p
                  v-if="errors.name"
                  class="text-red-400 text-xs mt-2 font-medium"
                >
                  {{ errors.name }}
                </p>
              </div>
              <div>
                <label
                  class="block text-xs font-bold uppercase tracking-widest text-muted mb-2"
                  >Email Address</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="yourname@example.com"
                  class="w-full bg-slate-100 border border-slate-300 rounded-xl px-5 py-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent transition-all duration-300 text-sm font-medium"
                  :class="errors.email ? 'border-red-500/60' : ''"
                />
                <p
                  v-if="errors.email"
                  class="text-red-400 text-xs mt-2 font-medium"
                >
                  {{ errors.email }}
                </p>
              </div>
            </div>

            <!-- Subject -->
            <div>
              <label
                class="block text-xs font-bold uppercase tracking-widest text-muted mb-2"
                >Subject</label
              >
              <input
                v-model="form.subject"
                type="text"
                placeholder="Project Collaboration / Job Opportunity / Just Saying Hi"
                class="w-full bg-slate-100 border border-slate-300 rounded-xl px-5 py-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent transition-all duration-300 text-sm font-medium"
                :class="errors.subject ? 'border-red-500/60' : ''"
              />
              <p
                v-if="errors.subject"
                class="text-red-400 text-xs mt-2 font-medium"
              >
                {{ errors.subject }}
              </p>
            </div>

            <!-- Message -->
            <div>
              <label
                class="block text-xs font-bold uppercase tracking-widest text-muted mb-2"
                >Message</label
              >
              <textarea
                v-model="form.message"
                rows="6"
                placeholder="Tell me about your project, or just say hello!"
                class="w-full bg-slate-100 border border-slate-300 rounded-xl px-5 py-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-accent transition-all duration-300 resize-none text-sm font-medium"
                :class="errors.message ? 'border-red-500/60' : ''"
              ></textarea>
              <div class="flex justify-between items-center mt-1">
                <p
                  v-if="errors.message"
                  class="text-red-400 text-xs font-medium"
                >
                  {{ errors.message }}
                </p>
                <p class="text-muted text-xs ml-auto">
                  {{ form.message.length }} / 500
                </p>
              </div>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="group w-full flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black rounded-full relative overflow-hidden transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-widest"
            >
              <span class="relative z-10">
                {{ isSubmitting ? "Sending..." : "Send Message" }}
              </span>
              <div
                v-if="!isSubmitting"
                class="absolute inset-0 bg-accent origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
              ></div>
              <!-- Spinner -->
              <div
                v-if="isSubmitting"
                class="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"
              ></div>
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-16 border-t border-white/5">
      <div
        class="container-wide flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <p class="text-muted text-sm">
          &copy; 2026 Rohan Jadav · Built with passion
        </p>
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

input:focus,
textarea:focus {
  box-shadow:
    0 0 0 0.5px var(--color-accent),
    0 0 20px rgba(30, 64, 175, 0.2);
}
</style>
