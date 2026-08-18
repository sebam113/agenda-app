import { useState, useEffect } from 'react'
import { buscarContactos } from './contactosApi'

function BuscadorContactos() {
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
          </li>
        ))}
      </ul>
    </section>
  )
}

export default BuscadorContactos