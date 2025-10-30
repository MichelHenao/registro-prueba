<script setup>
const open = defineModel('open', { type: Boolean, default: false })
const props = defineProps({ title: { type: String, required: true } })
</script>

<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-black/30" />
      <div class="absolute inset-0 grid place-items-center p-4">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <h2 class="mb-4 text-lg font-semibold text-gray-900">{{ props.title }}</h2>
          <div class="prose prose-sm max-w-none">
            <slot />
          </div>
          <div class="mt-6 text-right">
            <button class="btn btn-primary" @click="open = false">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
