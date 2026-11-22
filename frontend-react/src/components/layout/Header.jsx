
import { Bell, Search, UserRound } from 'lucide-react'

function Header({ title, subtitle, usuario }) {
  const nombreCompleto = usuario
    ? `${usuario.nombre} ${usuario.apellido}`
    : 'Usuario'

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
        <label className="search-box">
          <Search size={18} />
          <input
            type="search"
            placeholder="Buscar..."
            aria-label="Buscar"
          />
        </label>

        <button
          type="button"
          className="notification-button"
          aria-label="Notificaciones"
        >
          <Bell size={20} />
        </button>

        <div className="header-profile">
          <div className="profile-avatar">
            <UserRound size={20} />
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
