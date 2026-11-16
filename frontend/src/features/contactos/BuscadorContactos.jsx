import { useState, useEffect } from 'react'
import { buscarContactos, eliminarContacto } from './contactosApi'

function BuscadorContactos({ alEditar }) {
  const [nombre, setNombre] = useState('')
  const [contactos, setContactos] = useState([])
  const [cargando, setCargando] = useState(false)

  async function cargarContactos(filtro) {
    setCargando(true)
    try {
      const datos = await buscarContactos(filtro)
      setContactos(datos)
    } catch (error) {
      setContactos([])
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarContactos('')
  }, [])

  function manejarBusqueda(evento) {
    evento.preventDefault()
    cargarContactos(nombre)
  }

  async function manejarEliminar(id) {
    try {
      await eliminarContacto(id)
      cargarContactos(nombre)
    } catch (error) {
      alert('No se pudo eliminar el contacto')
    }
  }

  return (
    <section className="buscador-contactos">
      <h2>Buscar contactos</h2>
      <form onSubmit={manejarBusqueda}>
        <input
          placeholder="Buscar por nombre..."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {cargando && <p>Cargando...</p>}

      <ul>
        {contactos.map((contacto) => (
          <li key={contacto.id}>
            <strong>{contacto.nombre}</strong> — {contacto.email}
            {contacto.telefono && ` — ${contacto.telefono}`}
            <button onClick={() => alEditar(contacto)}>Editar</button>
            <button onClick={() => manejarEliminar(contacto.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BuscadorContactos