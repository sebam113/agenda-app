const API_URL = 'https://glorious-xylophone-wrg5wrwqr7x7h9g7q-8000.app.github.dev'

export async function crearContacto(contacto) {
  const respuesta = await fetch(`${API_URL}/contactos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contacto),
  })
  if (!respuesta.ok) {
    throw new Error('No se pudo crear el contacto')
  }
  return respuesta.json()
}

export async function buscarContactos(nombre = '') {
  const url = nombre
    ? `${API_URL}/contactos?nombre=${encodeURIComponent(nombre)}`
    : `${API_URL}/contactos`
  const respuesta = await fetch(url)
  if (!respuesta.ok) {
    throw new Error('No se pudieron buscar los contactos')
  }
  return respuesta.json()
}