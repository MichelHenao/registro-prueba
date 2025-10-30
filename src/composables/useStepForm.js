import { ref, watch, onMounted, onActivated, unref } from 'vue'
import { useForm } from 'vee-validate'

const isEmpty = (v) => v === '' || v === null || typeof v === 'undefined'

/**
 * Composable to manage a step form using vee-validate.
 * - syncs values with parent model
 * - exposes helpers to register fields and check validation state
 */
export function useStepForm(options) {
  const {
    validationSchema,
    model,
    emit,
    customWatch = null
  } = options

  const { validate, handleSubmit, setValues, setFieldValue, values } = useForm({
    validationSchema,
    initialValues: model.value,
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true
  })

  const fieldMeta = ref({})

  function registerField(name, { value: val, errorMessage: err }) {
    fieldMeta.value[name] = { val, err }
  }

  function valid(name) {
    const e = fieldMeta.value[name]
    if (!e) return null
    const v = unref(e.val)
    if (isEmpty(v)) return null
    return unref(e.err) ? false : true
  }

  function showErr(metaLike, errLike, valLike) {
    const meta = unref(metaLike)
    const err = unref(errLike)
    const val = unref(valLike)
    const hasVal = !isEmpty(val)
    return !!err && (meta?.touched || meta?.dirty || hasVal)
  }

  function setFile(field, e) {
    const file = e.target?.files?.[0] || null
    setFieldValue(field, file)
  }

  const emitValidity = async () => {
    const { valid } = await validate()
    emit('validity', valid)
  }

  onMounted(() => {
    setValues({ ...model.value })
    emitValidity()
  })

  watch(values, (v) => {
    model.value = { ...model.value, ...v }
    if (customWatch) customWatch(v)
    emitValidity()
  }, { deep: true })

  onActivated(emitValidity)

  return {
    validate,
    handleSubmit,
    setValues,
    setFieldValue,
    values,
    valid,
    showErr,
    registerField,
    setFile,
    createSubmitHandler: (callback) => handleSubmit((values) => {
      console.log('FORM DATA:', model.value)
      callback?.(values)
      emit('submitted')
    })
  }
}