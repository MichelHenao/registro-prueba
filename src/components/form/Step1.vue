<script setup>
import { ref } from 'vue'
import { useField } from 'vee-validate'
import { schemaStep1 } from '@/composables/validationSchemas'
import { fetchCountries } from '@/services/countries'
import FieldIcon from '@/components/form/FieldIcon.vue'
import { useStepForm } from '@/composables/useStepForm'

const model = defineModel({ type: Object, required: true })
const emit = defineEmits(['validity'])

const { valid, showErr, setFile, registerField } = useStepForm({
  validationSchema: schemaStep1,
  model,
  emit
})

 
const { value: pais,            meta: paisMeta,            errorMessage: paisErr,            handleBlur: paisBlur }            = useField('pais')
const { value: genero,          meta: generoMeta,          errorMessage: generoErr,          handleBlur: generoBlur }          = useField('genero')
const { value: primerNombre,    meta: primerNombreMeta,    errorMessage: primerNombreErr,    handleBlur: primerNombreBlur }    = useField('primerNombre')
const { value: segundoNombre,   meta: segundoNombreMeta,   errorMessage: segundoNombreErr,   handleBlur: segundoNombreBlur }   = useField('segundoNombre')
const { value: fechaNacimiento, meta: fechaNacimientoMeta, errorMessage: fechaNacimientoErr, handleBlur: fechaNacimientoBlur } = useField('fechaNacimiento')
const { value: tipoDocumento,   meta: tipoDocumentoMeta,   errorMessage: tipoDocumentoErr,   handleBlur: tipoDocumentoBlur }   = useField('tipoDocumento')
const { value: numeroDocumento, meta: numeroDocumentoMeta, errorMessage: numeroDocumentoErr, handleBlur: numeroDocumentoBlur } = useField('numeroDocumento')
const { value: fotoDocFrente,   meta: fotoFrenteMeta,      errorMessage: fotoFrenteErr,      handleBlur: fotoFrenteBlur }      = useField('fotoDocFrente')
const { value: fotoDocReverso,  meta: fotoReversoMeta,     errorMessage: fotoReversoErr,     handleBlur: fotoReversoBlur }     = useField('fotoDocReverso')

registerField('pais', { value: pais, errorMessage: paisErr })
registerField('genero', { value: genero, errorMessage: generoErr })
registerField('primerNombre', { value: primerNombre, errorMessage: primerNombreErr })
registerField('segundoNombre', { value: segundoNombre, errorMessage: segundoNombreErr })
registerField('fechaNacimiento', { value: fechaNacimiento, errorMessage: fechaNacimientoErr })
registerField('tipoDocumento', { value: tipoDocumento, errorMessage: tipoDocumentoErr })
registerField('numeroDocumento', { value: numeroDocumento, errorMessage: numeroDocumentoErr })
registerField('fotoDocFrente', { value: fotoDocFrente, errorMessage: fotoFrenteErr })
registerField('fotoDocReverso', { value: fotoDocReverso, errorMessage: fotoReversoErr })
const countries = ref([])
fetchCountries().then(r => { countries.value = r || [] })
</script>

<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">País</label>
      <select v-model="pais" class="form-control" @blur="paisBlur">
        <option value="" disabled>Selecciona un país</option>
        <option v-for="c in countries" :key="c.code" :value="c.name">{{ c.name }}</option>
      </select>
      <FieldIcon :valid="valid('pais')" />
      <p v-if="showErr(paisMeta, paisErr, pais)" class="mt-1 text-sm text-rose-600">{{ paisErr }}</p>
    </div>

    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">Género</label>
      <select v-model="genero" class="form-control" @blur="generoBlur">
        <option value="" disabled>Selecciona</option>
        <option>Femenino</option>
        <option>Masculino</option>
        <option>Otro</option>
        <option>Prefiero no decir</option>
      </select>
      <FieldIcon :valid="valid('genero')" />
      <p v-if="showErr(generoMeta, generoErr, genero)" class="mt-1 text-sm text-rose-600">{{ generoErr }}</p>
    </div>

    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">Primer nombre</label>
      <input v-model.trim="primerNombre" type="text" class="form-control" autocomplete="given-name" @blur="primerNombreBlur" />
      <FieldIcon :valid="valid('primerNombre')" />
      <p v-if="showErr(primerNombreMeta, primerNombreErr, primerNombre)" class="mt-1 text-sm text-rose-600">{{ primerNombreErr }}</p>
    </div>

    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">Segundo nombre</label>
      <input v-model.trim="segundoNombre" type="text" class="form-control" autocomplete="additional-name" @blur="segundoNombreBlur" />
      <FieldIcon :valid="valid('segundoNombre')" />
      <p v-if="showErr(segundoNombreMeta, segundoNombreErr, segundoNombre)" class="mt-1 text-sm text-rose-600">{{ segundoNombreErr }}</p>
    </div>

    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
      <input v-model="fechaNacimiento" type="date" class="form-control" @blur="fechaNacimientoBlur" />
      <FieldIcon :valid="valid('fechaNacimiento')" />
      <p v-if="showErr(fechaNacimientoMeta, fechaNacimientoErr, fechaNacimiento)" class="mt-1 text-sm text-rose-600">{{ fechaNacimientoErr }}</p>
    </div>

    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">Tipo de documento</label>
      <select v-model="tipoDocumento" class="form-control" @blur="tipoDocumentoBlur">
        <option value="" disabled>Selecciona</option>
        <option>Cédula de ciudadanía</option>
        <option>Pasaporte</option>
        <option>Cédula de extranjería</option>
      </select>
      <FieldIcon :valid="valid('tipoDocumento')" />
      <p v-if="showErr(tipoDocumentoMeta, tipoDocumentoErr, tipoDocumento)" class="mt-1 text-sm text-rose-600">{{ tipoDocumentoErr }}</p>
    </div>

    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">Número de documento</label>
      <input v-model="numeroDocumento" inputmode="numeric" pattern="\d*" class="form-control" type="text" @blur="numeroDocumentoBlur" />
      <FieldIcon :valid="valid('numeroDocumento')" />
      <p v-if="showErr(numeroDocumentoMeta, numeroDocumentoErr, numeroDocumento)" class="mt-1 text-sm text-rose-600">{{ numeroDocumentoErr }}</p>
    </div>

    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">Foto documento – Frente (JPG)</label>
      <input
        accept=".jpg,.jpeg,image/jpeg"
        type="file"
        class="form-control file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2"
        @change="(e) => setFile('fotoDocFrente', e)"
        @blur="fotoFrenteBlur"
      />
      <FieldIcon :valid="valid('fotoDocFrente')" />
      <p v-if="showErr(fotoFrenteMeta, fotoFrenteErr, fotoDocFrente)" class="mt-1 text-sm text-rose-600">{{ fotoFrenteErr }}</p>
    </div>

    <div class="form-field">
      <label class="mb-1 block text-sm font-medium text-gray-700">Foto documento – Reverso (JPG)</label>
      <input
        accept=".jpg,.jpeg,image/jpeg"
        type="file"
        class="form-control file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2"
        @change="(e) => setFile('fotoDocReverso', e)"
        @blur="fotoReversoBlur"
      />
      <FieldIcon :valid="valid('fotoDocReverso')" />
      <p v-if="showErr(fotoReversoMeta, fotoReversoErr, fotoDocReverso)" class="mt-1 text-sm text-rose-600">{{ fotoReversoErr }}</p>
    </div>
  </div>
</template>
