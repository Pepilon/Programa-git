
import { Bell, Search, UserRound } from 'lucide-react'

// Muestra el encabezado, la información de la página y el usuario.
function Header({ title, subtitle, usuario }) {
  // Obtiene el nombre completo del usuario autenticado.
  const nombreCompleto = usuario
    ? `${usuario.nombre} ${usuario.apellido}`
    : 'Usuario'

  // Presenta el rol con la primera letra en mayúscula.
  const rol = usuario?.rol
    ? usuario.rol.charAt(0) + usuario.rol.slice(1).toLowerCase()
    : 'Power Gym'

  return (
    <header className="main-header">
      <div className="header-heading">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-actions">
        {/* Campo visual de búsqueda; su funcionalidad está pendiente. */}
        <label className="search-box">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            placeholder="Buscar..."
            aria-label="Buscar"
          />
        </label>

        {/* Botón visual de notificaciones; pendiente de implementación. */}
        <button
          type="button"
          className="notification-button"
          aria-label="Notificaciones"
        >
          <Bell size={20} aria-hidden="true" />
        </button>

        {/* Información del usuario que inició sesión. */}
        <div className="header-profile">
          <div className="profile-avatar">
            <UserRound size={20} aria-hidden="true" />
          </div>

          <div className="profile-info">
            <strong>{nombreCompleto}</strong>
            <span>{rol}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
