<script setup>
import { ref, computed, watch } from 'vue'
import Step1 from '@/components/form/Step1.vue'
import Step2 from '@/components/form/Step2.vue'
import Step3 from '@/components/form/Step3.vue'
import ProgressSteps from '@/components/ui/ProgressSteps.vue'
import A11yModal from '@/components/ui/A11yModal.vue'

const gradientBg = 'bg-gradient-to-br from-gray-50 to-gray-100'

const step = ref(1)
const total = 3

const form = ref({
  
  pais: '',
  genero: '',
  primerNombre: '',
  segundoNombre: '',
  fechaNacimiento: '',
  tipoDocumento: '',
  numeroDocumento: '',
  fotoDocFrente: null,
  fotoDocReverso: null,
  
  email: '',
  password: '',
  password2: '',
  telefono: '',
  celular: '',
  
  direccion: '',
  codigoPostal: ''
})

const canPrev = computed(() => step.value > 1)
const canNext = ref(false)

function onValidityChange(v) {
  canNext.value = v
}

function next() {
  if (step.value < total && canNext.value) step.value++
}
function prev() {
  if (canPrev.value) step.value--
}

const showOk = ref(false)
function onSubmitOk() {
  showOk.value = true
}
watch(step, () => {
  canNext.value = false
})
</script>

<template>
  <main :class="[gradientBg, 'min-h-screen']">
    <div class="mx-auto max-w-4xl px-4 py-10">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-center mb-8">
          <span class="inline-block text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 pb-2">
            Formulario de registro
          </span>
        </h1>

        <ProgressSteps :current="step" :total="total" class="mb-10" />
        
        <div class="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100/50 backdrop-blur-sm">
          <KeepAlive>
            <component
              :is="step === 1 ? Step1 : step === 2 ? Step2 : Step3"
              v-model="form"
              @validity="onValidityChange"
              @submitted="onSubmitOk"
            />
          </KeepAlive>

          <div class="mt-8 flex items-center justify-between">
            <button class="btn btn-secondary" :disabled="!canPrev" @click="prev">Atrás</button>
            <div class="flex items-center gap-3">
              <button v-if="step < 3" class="btn btn-primary" :disabled="!canNext" @click="next">Siguiente</button>
              <button v-else class="btn btn-primary" form="step3-form" type="submit">Enviar</button>
            </div>
          </div>
        </div>
      </div>

      <A11yModal v-model:open="showOk" title="Formulario enviado">
        <p class="text-gray-700">Tu formulario se envió con éxito. Revisa la consola para ver el JSON enviado.</p>
      </A11yModal>
    </div>
  </main>
</template>

