
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

function Sidebar({ activePath, onNavigate, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Dumbbell size={25} />
        </div>
        <div>
          <h2>POWER GYM</h2>
          <span>Gestión deportiva</span>
        </div>
      </div>

      <div className="sidebar-section">MENÚ PRINCIPAL</div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <button
              key={item.path}
              type="button"
              className={`nav-item ${activePath === item.path ? 'active' : ''}`}
              onClick={() => onNavigate(item.path)}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <button type="button" className="logout-button" onClick={onLogout}>
          <LogOut size={19} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
