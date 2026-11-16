import { useState } from 'react'
import Hero from './components/Hero'
import Sobre from './components/Sobre'
import FormularioContacto from './features/contactos/FormularioContacto'
import BuscadorContactos from './features/contactos/BuscadorContactos'

function App() {
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null)

  return (
    <>
      <Hero />
      <Sobre />
      <FormularioContacto contactoEnEdicion={contactoEnEdicion} />
      <BuscadorContactos alEditar={setContactoEnEdicion} />
    </>
  )
}

export default App