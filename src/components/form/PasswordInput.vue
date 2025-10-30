<script setup>
import { ref } from 'vue'
const modelValue = defineModel({ type: String, default: '' })
const show = ref(false)
function toggle(){ show.value = !show.value }
</script>

<template>
  <div class="relative">
    <input :type="show ? 'text' : 'password'" v-model="modelValue" class="form-control pr-12" autocomplete="new-password" />
    <button type="button" class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            @click="toggle" aria-label="Mostrar/ocultar contraseña">
      <svg v-if="!show" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
        <path d="M12 4.5c-5 0-9.27 3.11-11 7.5 1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
        <path d="M3.28 2.22 1.86 3.64l3.1 3.1C3.2 8.06 1.84 9.63 1 12c1.73 4.39 6 7.5 11 7.5 2.05 0 3.99-.49 5.69-1.36l2.45 2.46 1.41-1.42L3.28 2.22ZM12 6.5c1.11 0 2.13.33 2.98.9l-1.46 1.46A3.5 3.5 0 0 0 8.86 14L7.4 15.46A5 5 0 0 1 12 6.5Z"/>
      </svg>
    </button>
  </div>
</template>
