import { useState } from 'react'
import { crearContacto } from './contactosApi'

function FormularioContacto() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    nota: '',
  })
  const [mensaje, setMensaje] = useState('')

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setFormulario({ ...formulario, [name]: value })
  }

  async function manejarEnvio(evento) {
    evento.preventDefault()
    try {
      await crearContacto(formulario)
      setMensaje('Contacto guardado correctamente')
      setFormulario({ nombre: '', email: '', telefono: '', nota: '' })
    } catch (error) {
      setMensaje('Error al guardar el contacto')
    }
  }

  return (
    <section className="formulario-contacto">
      <h2>Agregar contacto</h2>
      <form onSubmit={manejarEnvio}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formulario.email}
          onChange={manejarCambio}
          required
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          value={formulario.telefono}
          onChange={manejarCambio}
        />
        <textarea
          name="nota"
          placeholder="Nota"
          value={formulario.nota}
          onChange={manejarCambio}
        />
        <button type="submit">Guardar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </section>
  )
}

export default FormularioContacto