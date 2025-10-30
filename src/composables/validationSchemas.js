import * as yup from 'yup'

/** Return true when value is a valid date and age >= 18 */
const isAdult = (value) => {
  if (!value) return false
  const birth = new Date(value)
  if (Number.isNaN(birth.getTime())) return false
  const now = new Date()
  let age = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--
  return age >= 18
}

const fileIsJpg = (file) => !!file && (file.type === 'image/jpeg' || /\.jpe?g$/i.test(file.name || ''))

export const schemaStep1 = yup.object({
  pais: yup.string().required('Selecciona un país'),
  genero: yup.string().required('Selecciona tu género'),
  primerNombre: yup.string().trim().required('Primer nombre requerido'),
  segundoNombre: yup.string().trim().required('Segundo nombre requerido'),
  fechaNacimiento: yup.string().required('Fecha requerida').test('adult', 'Debes ser mayor de 18', isAdult),
  tipoDocumento: yup.string().oneOf(['Cédula de ciudadanía','Pasaporte','Cédula de extranjería'], 'Selecciona un tipo válido').required('Tipo de documento requerido'),
  numeroDocumento: yup.string().matches(/^\d{5,}$/,'Solo dígitos, mínimo 5').required('Número requerido'),
  fotoDocFrente: yup.mixed().required('Adjunta la foto (frente)').test('jpg','Debe ser JPG', fileIsJpg),
  fotoDocReverso: yup.mixed().required('Adjunta la foto (reverso)').test('jpg','Debe ser JPG', fileIsJpg)
})

export const schemaStep2 = yup.object({
  email: yup.string().email('Correo inválido').required('Correo requerido'),
  password: yup.string().min(6,'Mínimo 6 caracteres').required('Contraseña requerida'),
  password2: yup.string().oneOf([yup.ref('password')],'Debe coincidir').required('Confirmación requerida'),
  telefono: yup.string().matches(/^\d{7,}$/,'Solo dígitos, mínimo 7').required('Teléfono requerido'),
  celular: yup.string().matches(/^\d{10,}$/,'Solo dígitos, mínimo 10').required('Celular requerido')
})

export const schemaStep3 = yup.object({
  direccion: yup.string().required('Dirección requerida'),
  codigoPostal: yup.string().min(4,'Mínimo 4 caracteres').required('Código postal requerido')
})

export const stepFields = {
  1: ['pais','genero','primerNombre','segundoNombre','fechaNacimiento','tipoDocumento','numeroDocumento','fotoDocFrente','fotoDocReverso'],
  2: ['email','password','password2','telefono','celular'],
  3: ['direccion','codigoPostal']
}
