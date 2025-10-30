<script setup>
const props = defineProps({
  current: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div class="flex justify-center w-full">
    <div class="w-full max-w-3xl px-4">
      <div class="relative flex justify-between">
        <template v-for="i in props.total" :key="i">
          <div class="relative z-10">
            <div :class="[
              'flex h-12 w-12 items-center justify-center rounded-full text-base font-semibold shadow-lg transition-all duration-300',
              i < props.current ? 'bg-emerald-600 text-white scale-105' : 
              i === props.current ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 
              'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]">
              {{ i }}
            </div>
          </div>

          <div 
            v-if="i < props.total"
            class="flex-1 mx-4"
          >
            <div :class="[
              'h-1 w-full mt-6',
              i < props.current ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' : 
              'bg-gradient-to-r from-gray-200 to-gray-300'
            ]" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
