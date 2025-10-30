export async function fetchCountries() {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
  const data = await res.json()
  return data
    .map(c => ({ code: c.cca2, name: c.name?.common || '' }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
