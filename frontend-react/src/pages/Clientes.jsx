import { useEffect, useMemo, useState } from 'react'
import {
  Search,
  Plus,
  Pencil,
  UserX,
  Users,
  RefreshCw,
  X,
} from 'lucide-react'

import {
  listarClientes,
  registrarCliente,
  actualizarCliente,
  desactivarCliente,
} from '../services/clienteService'

const formularioInicial = {
  nombre: '',
  apellido: '',
  documento: '',
  email: '',
  telefono: '',
  password: '',
  fechaNacimiento: '',
  genero: '',
  peso: '',
  altura: '',
  objetivo: '',
}

function Clientes() {
  const [clientes, setClientes] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [clienteEditando, setClienteEditando] = useState(null)
  const [formulario, setFormulario] = useState(formularioInicial)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  const cargarClientes = async () => {
    setCargando(true)
    setError('')

    try {
      const datos = await listarClientes()
      setClientes(Array.isArray(datos) ? datos : [])
    } catch (err) {
      setError(err.message || 'No fue posible cargar los clientes.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarClientes()
  }, [])

  const clientesFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()

    if (!termino) return clientes

    return clientes.filter((cliente) =>
      [
        cliente.nombre,
        cliente.apellido,
        cliente.documento,
        cliente.email,
        cliente.telefono,
      ]
        .filter(Boolean)
        .some((valor) => String(valor).toLowerCase().includes(termino))
    )
  }, [clientes, busqueda])

  const abrirRegistro = () => {
    setClienteEditando(null)
    setFormulario(formularioInicial)
    setError('')
    setMensaje('')
    setModalAbierto(true)
  }

  const abrirEdicion = (cliente) => {
    setClienteEditando(cliente)

    setFormulario({
      nombre: cliente.nombre || '',
      apellido: cliente.apellido || '',
      documento: cliente.documento || '',
      email: cliente.email || '',
      telefono: cliente.telefono || '',
      password: '',
      fechaNacimiento: cliente.fechaNacimiento || '',
      genero: cliente.genero || '',
      peso: cliente.peso ?? '',
      altura: cliente.altura ?? '',
      objetivo: cliente.objetivo || '',
    })

    setError('')
    setMensaje('')
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    if (guardando) return

    setModalAbierto(false)
    setClienteEditando(null)
    setFormulario(formularioInicial)
    setError('')
  }

  const manejarCambio = (e) => {
    const { name, value } = e.target

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
    }))
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setError('')
    setMensaje('')

    setGuardando(true)

    const datos = {
      nombre: formulario.nombre.trim(),
      apellido: formulario.apellido.trim(),
      documento: formulario.documento.trim(),
      email: formulario.email.trim(),
      telefono: formulario.telefono.trim() || null,
      fechaNacimiento: formulario.fechaNacimiento || null,
      genero: formulario.genero || null,
      peso: formulario.peso || null,
      altura: formulario.altura || null,
      objetivo: formulario.objetivo.trim() || null,
    }

    try {
      if (clienteEditando) {
        await actualizarCliente({
          idCliente: clienteEditando.idCliente,
          ...datos,
        })

        setMensaje('Cliente actualizado correctamente.')
      } else {
        await registrarCliente({
          ...datos,
          password: formulario.password,
        })

        setMensaje('Cliente registrado correctamente.')
      }

      await cargarClientes()
      setModalAbierto(false)
      setFormulario(formularioInicial)
      setClienteEditando(null)
    } catch (err) {
      setError(err.message || 'No fue posible guardar el cliente.')
    } finally {
      setGuardando(false)
    }
  }

  const manejarDesactivacion = async (cliente) => {
    const confirmar = window.confirm(
      `¿Deseas desactivar a ${cliente.nombre} ${cliente.apellido}?`
    )

    if (!confirmar) return

    setError('')
    setMensaje('')

    try {
      await desactivarCliente(cliente.idCliente)
      setMensaje('Cliente desactivado correctamente.')
      await cargarClientes()
    } catch (err) {
      setError(err.message || 'No fue posible desactivar el cliente.')
    }
  }

  return (
    <section className="clients-page">
      <div className="clients-toolbar">
        <div>
          <h2>Gestión de clientes</h2>
          <p>Administra la información de los clientes de Power Gym.</p>
        </div>

        <button
          type="button"
          className="clients-primary-button"
          onClick={abrirRegistro}
        >
          <Plus size={18} />
          Nuevo cliente
        </button>
      </div>

      <div className="clients-summary">
        <div className="clients-summary-icon">
          <Users size={23} />
        </div>
        <div>
          <span>Clientes activos</span>
          <strong>{clientes.length}</strong>
        </div>
      </div>

      {mensaje && <div className="clients-success">{mensaje}</div>}
      {error && <div className="clients-error">{error}</div>}

      <div className="clients-table-card">
        <div className="clients-table-heading">
          <div>
            <h3>Listado de clientes</h3>
            <p>Información registrada en el sistema.</p>
          </div>

          <div className="clients-table-actions">
            <div className="clients-search">
              <Search size={17} />
              <input
                type="search"
                placeholder="Buscar cliente..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="clients-refresh-button"
              onClick={cargarClientes}
              title="Actualizar listado"
              disabled={cargando}
            >
              <RefreshCw size={17} />
            </button>
          </div>
        </div>

        {cargando ? (
          <div className="clients-empty">
            Cargando clientes...
          </div>
        ) : clientesFiltrados.length === 0 ? (
          <div className="clients-empty">
            {busqueda
              ? 'No se encontraron clientes con esa búsqueda.'
              : 'Todavía no hay clientes registrados.'}
          </div>
        ) : (
          <div className="clients-table-container">
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Documento</th>
                  <th>Correo electrónico</th>
                  <th>Teléfono</th>
                  <th>Objetivo</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {clientesFiltrados.map((cliente) => (
                  <tr key={cliente.idCliente}>
                    <td>
                      <strong>
                        {cliente.nombre} {cliente.apellido}
                      </strong>
                    </td>
                    <td>{cliente.documento || '—'}</td>
                    <td>{cliente.email || '—'}</td>
                    <td>{cliente.telefono || '—'}</td>
                    <td>{cliente.objetivo || '—'}</td>
                    <td>
                      <div className="clients-row-actions">
                        <button
                          type="button"
                          className="clients-edit-button"
                          title="Editar cliente"
                          onClick={() => abrirEdicion(cliente)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          className="clients-delete-button"
                          title="Desactivar cliente"
                          onClick={() => manejarDesactivacion(cliente)}
                        >
                          <UserX size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalAbierto && (
        <div className="clients-modal-overlay">
          <div
            className="clients-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="clients-modal-title"
          >
            <div className="clients-modal-heading">
              <div>
                <h3 id="clients-modal-title">
                  {clienteEditando ? 'Editar cliente' : 'Registrar cliente'}
                </h3>
                <p>
                  {clienteEditando
                    ? 'Actualiza la información del cliente.'
                    : 'Completa los datos para registrar un nuevo cliente.'}
                </p>
              </div>

              <button
                type="button"
                className="clients-close-button"
                onClick={cerrarModal}
                disabled={guardando}
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            <form className="clients-form" onSubmit={manejarEnvio}>
              <h4>Información personal</h4>

              <div className="clients-form-grid">
                <label>
                  Nombre *
                  <input
                    name="nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                    maxLength={100}
                  />
                </label>

                <label>
                  Apellido *
                  <input
                    name="apellido"
                    value={formulario.apellido}
                    onChange={manejarCambio}
                    required
                    maxLength={100}
                  />
                </label>

                <label>
                  Documento *
                  <input
                    name="documento"
                    value={formulario.documento}
                    onChange={manejarCambio}
                    required
                    maxLength={30}
                  />
                </label>

                <label>
                  Correo electrónico *
                  <input
                    type="email"
                    name="email"
                    value={formulario.email}
                    onChange={manejarCambio}
                    required
                    maxLength={150}
                  />
                </label>

                <label>
                  Teléfono
                  <input
                    type="tel"
                    name="telefono"
                    value={formulario.telefono}
                    onChange={manejarCambio}
                    maxLength={20}
                  />
                </label>

                {!clienteEditando && (
                  <label>
                    Contraseña *
                    <input
                      type="password"
                      name="password"
                      value={formulario.password}
                      onChange={manejarCambio}
                      required
                      minLength={6}
                      autoComplete="new-password"
                    />
                  </label>
                )}

                <label>
                  Fecha de nacimiento
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={formulario.fechaNacimiento}
                    onChange={manejarCambio}
                  />
                </label>

                <label>
                  Género
                  <select
                    name="genero"
                    value={formulario.genero}
                    onChange={manejarCambio}
                  >
                    <option value="">Seleccionar</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMENINO">Femenino</option>
                    <option value="OTRO">Otro</option>
                  </select>
                </label>
              </div>

              <h4>Información física</h4>

              <div className="clients-form-grid">
                <label>
                  Peso (kg)
                  <input
                    type="number"
                    name="peso"
                    value={formulario.peso}
                    onChange={manejarCambio}
                    min="0"
                    max="999"
                    step="0.01"
                  />
                </label>

                <label>
                  Altura (m)
                  <input
                    type="number"
                    name="altura"
                    value={formulario.altura}
                    onChange={manejarCambio}
                    min="0"
                    max="99"
                    step="0.01"
                  />
                </label>

                <label className="clients-full-width">
                  Objetivo de entrenamiento
                  <input
                    name="objetivo"
                    value={formulario.objetivo}
                    onChange={manejarCambio}
                    maxLength={250}
                    placeholder="Ej. Aumentar masa muscular"
                  />
                </label>
              </div>

              {error && <div className="clients-error">{error}</div>}

              <div className="clients-form-actions">
                <button
                  type="button"
                  className="clients-cancel-button"
                  onClick={cerrarModal}
                  disabled={guardando}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="clients-primary-button"
                  disabled={guardando}
                >
                  {guardando
                    ? 'Guardando...'
                    : clienteEditando
                      ? 'Guardar cambios'
                      : 'Registrar cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Clientes
