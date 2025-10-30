<script setup>
const props = defineProps({
  valid: {
    type: [Boolean, null],
    default: null
  }
})
</script>

<template>
  <span class="field-icon" aria-hidden="true">
    <svg v-if="props.valid === true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 text-emerald-600">
      <path fill-rule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3-3a1 1 0 011.42-1.42l2.29 2.29 6.79-6.79a1 1 0 011.42 0z" clip-rule="evenodd" />
    </svg>
    <svg v-else-if="props.valid === false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5 text-rose-600">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2.707-5.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 10-1.414-1.414L10 8.586 8.707 7.293a1 1 0 10-1.414 1.414L8.586 10l-1.293 1.293z" clip-rule="evenodd" />
    </svg>
  </span>
</template>
