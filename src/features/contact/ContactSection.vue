<script setup lang="ts">
import { ref, reactive } from 'vue'
import StudioButton from '../../shared/components/StudioButton.vue'

const props = defineProps<{ id?: string }>()

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)

const validate = () => {
  let valid = true
  errors.name = form.name.length < 2 ? 'Name is too short' : ''
  errors.email = !/^\S+@\S+\.\S+$/.test(form.email) ? 'Invalid email address' : ''
  errors.message = form.message.length < 10 ? 'Message should be longer' : ''
  
  if (errors.name || errors.email || errors.message) valid = false
  return valid
}

const handleSubmit = async () => {
  if (!validate()) return

  isSubmitting.value = true
  
  // Simulate API call
  await new Promise<void>(resolve => setTimeout(resolve, 2000))
  
  isSubmitting.value = false
  isSuccess.value = true
  
  // Reset form after delay
  setTimeout(() => {
    isSuccess.value = false
    Object.assign(form, { name: '', email: '', message: '' })
  }, 3000)
}
</script>

<template>
  <section :id="props.id" class="py-32 px-4 relative overflow-hidden">
    <div class="max-w-4xl mx-auto relative z-10">
      <div class="mb-16 text-center">
        <h2 class="text-xs uppercase tracking-[0.5em] font-bold text-accent mb-4">Contact</h2>
        <h3 class="text-5xl md:text-7xl font-bold tracking-tight">Let's build <br> something <span class="text-neon">Legendary.</span></h3>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-8">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Name Input -->
          <div class="relative group">
            <input 
              v-model="form.name"
              type="text"
              placeholder="Full Name"
              class="w-full bg-surface border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-accent transition-all duration-500 placeholder:text-muted/30"
              :class="{ 'border-red-500/50': errors.name }"
            >
            <div class="absolute inset-0 rounded-2xl bg-accent opacity-0 blur-xl transition-opacity duration-500 pointer-events-none -z-10 group-focus-within:opacity-20"></div>
            <p v-if="errors.name" class="text-xs text-red-400 mt-2 px-2">{{ errors.name }}</p>
          </div>

          <!-- Email Input -->
          <div class="relative group">
            <input 
              v-model="form.email"
              type="email"
              placeholder="Email Address"
              class="w-full bg-surface border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-accent transition-all duration-500 placeholder:text-muted/30"
              :class="{ 'border-red-500/50': errors.email }"
            >
            <div class="absolute inset-0 rounded-2xl bg-accent opacity-0 blur-xl transition-opacity duration-500 pointer-events-none -z-10 group-focus-within:opacity-20"></div>
            <p v-if="errors.email" class="text-xs text-red-400 mt-2 px-2">{{ errors.email }}</p>
          </div>
        </div>

        <!-- Message Input -->
        <div class="relative group">
          <textarea 
            v-model="form.message"
            rows="6"
            placeholder="Tell us about your project..."
            class="w-full bg-surface border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-accent transition-all duration-500 placeholder:text-muted/30 resize-none"
            :class="{ 'border-red-500/50': errors.message }"
          ></textarea>
          <div class="absolute inset-0 rounded-2xl bg-accent opacity-0 blur-xl transition-opacity duration-500 pointer-events-none -z-10 group-focus-within:opacity-20"></div>
          <p v-if="errors.message" class="text-xs text-red-400 mt-2 px-2">{{ errors.message }}</p>
        </div>

        <div class="flex justify-center pt-8">
          <StudioButton 
            v-if="!isSuccess"
            :text="isSubmitting ? 'Sending...' : 'Send Message'" 
            type="submit"
            :disabled="isSubmitting"
          />
          <div v-else class="text-neon font-bold flex items-center gap-2 animate-bounce">
            <span>✓</span> Message Sent Successfully!
          </div>
        </div>
      </form>
    </div>

    <!-- Background Decorative Elements -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[120px] rounded-full -z-10"></div>
  </section>
</template>
