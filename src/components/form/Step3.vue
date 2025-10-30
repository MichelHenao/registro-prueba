<script setup>
import { useField } from 'vee-validate'
import { schemaStep3 } from '@/composables/validationSchemas'
import FieldIcon from '@/components/form/FieldIcon.vue'
import { useStepForm } from '@/composables/useStepForm'

const model = defineModel({ type: Object, required: true })
const emit = defineEmits(['validity', 'submitted'])

const { valid, showErr, createSubmitHandler, registerField } = useStepForm({
  validationSchema: schemaStep3,
  model,
  emit
})

const { value: direccion,    meta: direccionMeta,    errorMessage: direccionErr }    = useField('direccion')
const { value: codigoPostal, meta: codigoPostalMeta, errorMessage: codigoPostalErr } = useField('codigoPostal')

registerField('direccion', { value: direccion, errorMessage: direccionErr })
registerField('codigoPostal', { value: codigoPostal, errorMessage: codigoPostalErr })

const onSubmit = createSubmitHandler()
</script>

<template>
  <form id="step3-form" class="grid grid-cols-1 gap-6 md:grid-cols-2" @submit.prevent="onSubmit">
    <div class="form-field md:col-span-2">
      <label class="mb-1 block text-sm font-medium text-gray-700">Dirección residencia</label>
      <input v-model.trim="direccion" type="text" class="form-control"/>
      <FieldIcon :valid="valid('direccion')" />
      <p v-if="showErr(direccionMeta, direccionErr, direccion)" class="mt-1 text-sm text-rose-600">{{ direccionErr }}</p>
    </div>

    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">Código postal</label>
      <input v-model.trim="codigoPostal" type="text" class="form-control" />
      <FieldIcon :valid="valid('codigoPostal')" />
      <p v-if="showErr(codigoPostalMeta, codigoPostalErr, codigoPostal)" class="mt-1 text-sm text-rose-600">{{ codigoPostalErr }}</p>
    </div>
  </form>
</template>
