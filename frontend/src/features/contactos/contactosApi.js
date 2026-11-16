const API_URL = 'https://agenda-app-sf2i.onrender.com'

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

export async function eliminarContacto(id) {
  const respuesta = await fetch(`${API_URL}/contactos/${id}`, {
    method: 'DELETE',
  })
  if (!respuesta.ok) {
    throw new Error('No se pudo eliminar el contacto')
  }
  return respuesta.json()
}

export async function editarContacto(id, cambios) {
  const respuesta = await fetch(`${API_URL}/contactos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cambios),
  })
  if (!respuesta.ok) {
    throw new Error('No se pudo editar el contacto')
  }
  return respuesta.json()
}