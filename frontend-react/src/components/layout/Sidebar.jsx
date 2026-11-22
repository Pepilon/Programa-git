
import {
  LayoutDashboard,
  Users,
  UserRound,
  CreditCard,
  Dumbbell,
  ClipboardList,
  CalendarCheck,
  Wallet,
  Activity,
  LogOut,
} from 'lucide-react'

// Opciones de navegación del sistema Power Gym.
const menuItems = [
  { label: 'Panel principal', path: '/', icon: LayoutDashboard },
  { label: 'Clientes', path: '/clientes', icon: Users },
  { label: 'Entrenadores', path: '/entrenadores', icon: UserRound },
  { label: 'Membresías', path: '/membresias', icon: CreditCard },
  { label: 'Rutinas', path: '/rutinas', icon: ClipboardList },
  { label: 'Ejercicios', path: '/ejercicios', icon: Dumbbell },
  { label: 'Asistencias', path: '/asistencias', icon: CalendarCheck },
  { label: 'Pagos', path: '/pagos', icon: Wallet },
  { label: 'Evaluaciones', path: '/evaluaciones', icon: Activity },
]

// Componente encargado de la navegación lateral.
function Sidebar({ activePath, onNavigate, onLogout }) {
  return (
    <aside className="sidebar">
      {/* Identidad visual del proyecto. */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Dumbbell size={25} aria-hidden="true" />
        </div>
        <div>
          <h2>POWER GYM</h2>
          <span>Gestión deportiva</span>
        </div>
      </div>

      <div className="sidebar-section">MENÚ PRINCIPAL</div>

      {/* Genera las opciones de navegación a partir de sus rutas. */}
      <nav className="sidebar-nav" aria-label="Navegación principal">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activePath === item.path

          return (
            <button
              key={item.path}
              type="button"
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(item.path)}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={19} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Acción para cerrar la sesión del usuario. */}
      <div className="sidebar-footer">
        <button
          type="button"
          className="logout-button"
          onClick={onLogout}
        >
          <LogOut size={19} aria-hidden="true" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
