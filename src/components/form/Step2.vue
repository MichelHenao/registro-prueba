<script setup>
import { useField } from 'vee-validate'
import { schemaStep2 } from '@/composables/validationSchemas'
import FieldIcon from '@/components/form/FieldIcon.vue'
import PasswordInput from '@/components/form/PasswordInput.vue'
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
      <PasswordInput v-model="password" />
      <FieldIcon :valid="valid('password')" />
      <p v-if="showErr(passwordMeta, passwordErr, password)" class="mt-1 text-sm text-rose-600">{{ passwordErr }}</p>
    </div>

    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">Confirmación de contraseña</label>
            <PasswordInput v-model="password2" />
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
