<script setup>
import { ref } from 'vue'
import { useField } from 'vee-validate'
import { schemaStep2 } from '@/composables/validationSchemas'
import FieldIcon from '@/components/form/FieldIcon.vue'
import { useStepForm } from '@/composables/useStepForm'

const model = defineModel({ type: Object, required: true })
const emit = defineEmits(['validity'])

const { valid, showErr, setFieldValue, registerField } = useStepForm({
  validationSchema: schemaStep2,
  model,
  emit,
  customWatch: (values) => {
    const cleanNumber = (value, field) => {
      const clean = (value || '').replace(/\D+/g, '')
      if (clean !== value) setFieldValue(field, clean)
    }
    cleanNumber(values.telefono, 'telefono')
    cleanNumber(values.celular, 'celular')
  }
})

 
const { value: email,     meta: emailMeta,     errorMessage: emailErr }     = useField('email')
const { value: password,  meta: passwordMeta,  errorMessage: passwordErr }  = useField('password')
const { value: password2, meta: password2Meta, errorMessage: password2Err } = useField('password2')
const { value: telefono,  meta: telefonoMeta,  errorMessage: telefonoErr }  = useField('telefono')
const { value: celular,   meta: celularMeta,   errorMessage: celularErr }   = useField('celular')

registerField('email', { value: email, errorMessage: emailErr })
registerField('password', { value: password, errorMessage: passwordErr })
registerField('password2', { value: password2, errorMessage: password2Err })
registerField('telefono', { value: telefono, errorMessage: telefonoErr })
registerField('celular', { value: celular, errorMessage: celularErr })
const showPwd = ref(false)
const showPwd2 = ref(false)
const pwdType = () => (showPwd.value ? 'text' : 'password')
const pwd2Type = () => (showPwd2.value ? 'text' : 'password')
</script>

<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div class="form-field md:col-span-2">
      <label class="mb-1 block text-sm font-medium text-gray-700">Correo electrónico</label>
      <input v-model.trim="email" type="email" class="form-control" autocomplete="email" />
      <FieldIcon :valid="valid('email')" />
      <p v-if="showErr(emailMeta, emailErr, email)" class="mt-1 text-sm text-rose-600">{{ emailErr }}</p>
    </div>

    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">Contraseña</label>
      <div class="relative">
        <input :type="pwdType()" v-model="password" class="form-control pr-10" autocomplete="new-password" />
        <button
          type="button"
          class="absolute inset-y-0 right-2 my-auto inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-50"
          :aria-label="showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'"
          @click="showPwd = !showPwd"
        >
          <svg v-if="!showPwd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12Z" />
            <circle cx="12" cy="12" r="3.5" stroke-width="1.5" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m3 3 18 18M6.75 7.5C4.5 9.13 3 12 3 12s3.75 6.75 9.75 6.75c2.01 0 3.83-.51 5.37-1.33M12 5.25c2.01 0 3.83.51 5.37 1.33" />
          </svg>
        </button>
      </div>
      <FieldIcon :valid="valid('password')" />
      <p v-if="showErr(passwordMeta, passwordErr, password)" class="mt-1 text-sm text-rose-600">{{ passwordErr }}</p>
    </div>

    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">Confirmación de contraseña</label>
      <div class="relative">
        <input :type="pwd2Type()" v-model="password2" class="form-control pr-10" autocomplete="new-password" />
        <button
          type="button"
          class="absolute inset-y-0 right-2 my-auto inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-50"
          :aria-label="showPwd2 ? 'Ocultar contraseña' : 'Mostrar contraseña'"
          @click="showPwd2 = !showPwd2"
        >
          <svg v-if="!showPwd2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12Z" />
            <circle cx="12" cy="12" r="3.5" stroke-width="1.5" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m3 3 18 18M6.75 7.5C4.5 9.13 3 12 3 12s3.75 6.75 9.75 6.75c2.01 0 3.83-.51 5.37-1.33M12 5.25c2.01 0 3.83.51 5.37 1.33" />
          </svg>
        </button>
      </div>
      <FieldIcon :valid="valid('password2')" />
      <p v-if="showErr(password2Meta, password2Err, password2)" class="mt-1 text-sm text-rose-600">{{ password2Err }}</p>
    </div>

    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">Número teléfono</label>
      <input v-model="telefono" inputmode="numeric" pattern="\d*" class="form-control" type="text" />
      <FieldIcon :valid="valid('telefono')" />
      <p v-if="showErr(telefonoMeta, telefonoErr, telefono)" class="mt-1 text-sm text-rose-600">{{ telefonoErr }}</p>
    </div>

    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">Número celular</label>
      <input v-model="celular" inputmode="numeric" pattern="\d*" class="form-control" type="text" />
      <FieldIcon :valid="valid('celular')" />
      <p v-if="showErr(celularMeta, celularErr, celular)" class="mt-1 text-sm text-rose-600">{{ celularErr }}</p>
    </div>
  </div>
</template>
