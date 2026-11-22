
import {
  Users,
  UserCheck,
  CreditCard,
  Wallet,
  TrendingUp,
  CalendarDays,
  ArrowUpRight,
  Activity
} from 'lucide-react'

// Indicadores ilustrativos. No corresponden a datos reales de MySQL.
const statistics = [
  {
    title: 'Total de clientes',
    value: '150',
    description: 'Dato de demostración',
    icon: Users,
    color: 'blue'
  },
  {
    title: 'Entrenadores',
    value: '8',
    description: 'Dato de demostración',
    icon: UserCheck,
    color: 'green'
  },
  {
    title: 'Membresías activas',
    value: '112',
    description: 'Dato de demostración',
    icon: CreditCard,
    color: 'purple'
  },
  {
    title: 'Ingresos del mes',
    value: '$8.450.000',
    description: 'Dato de demostración',
    icon: Wallet,
    color: 'orange'
  }
]

// Presenta el resumen general del sistema Power Gym.
function Dashboard() {
  return (
    <section className="dashboard">
      {/* Mensaje principal de bienvenida. */}
      <div className="welcome-banner">
        <div>
          <span className="welcome-label">SISTEMA DE GESTIÓN</span>
          <h2>Bienvenido a Power Gym</h2>
          <p>Administra tu gimnasio desde un solo lugar.</p>
        </div>

        <div className="welcome-icon">
          <Activity size={52} />
        </div>
      </div>

      {/* Indicadores de ejemplo del gimnasio. */}
      <div className="section-heading">
        <div>
          <h2>Resumen general</h2>
          <p>Indicadores de demostración, no datos reales</p>
        </div>

        <span className="current-period">
          <CalendarDays size={16} aria-hidden="true" />
          Vista general
        </span>
      </div>

      <div className="statistics-grid">
        {statistics.map((item) => {
          const Icon = item.icon

          return (
            <article className="stat-card" key={item.title}>
              <div className={`stat-icon ${item.color}`}>
                <Icon size={23} aria-hidden="true" />
              </div>

              <div className="stat-information">
                <span>{item.title}</span>
                <strong>{item.value}</strong>
                <small>{item.description}</small>
              </div>

              <ArrowUpRight
                className="stat-arrow"
                size={19}
                aria-hidden="true"
              />
            </article>
          )
        })}
      </div>

      {/* Información sobre los módulos contemplados en el proyecto. */}
      <div className="dashboard-bottom">
        <article className="dashboard-card activity-card">
          <div className="card-heading">
            <div>
              <h3>Actividad del gimnasio</h3>
              <p>Áreas contempladas en el proyecto</p>
            </div>
            <Activity size={22} aria-hidden="true" />
          </div>

          <div className="activity-item">
            <span className="activity-dot blue-dot"></span>
            <div>
              <strong>Gestión de clientes</strong>
              <p>Registro, consulta, edición y desactivación implementados.</p>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-dot green-dot"></span>
            <div>
              <strong>Control de membresías</strong>
              <p>Módulo contemplado, pendiente de desarrollo.</p>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-dot purple-dot"></span>
            <div>
              <strong>Seguimiento deportivo</strong>
              <p>Rutinas y evaluaciones contempladas en el proyecto.</p>
            </div>
          </div>
        </article>

        {/* Información general del propósito de la plataforma. */}
        <article className="dashboard-card system-card">
          <div className="card-heading">
            <div>
              <h3>Power Gym</h3>
              <p>Plataforma de administración</p>
            </div>
            <TrendingUp size={22} aria-hidden="true" />
          </div>

          <div className="system-message">
            <h2>Tu gimnasio, bajo control.</h2>
            <p>
              Gestiona clientes, entrenadores, pagos y procesos
              deportivos desde una plataforma organizada.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Dashboard
