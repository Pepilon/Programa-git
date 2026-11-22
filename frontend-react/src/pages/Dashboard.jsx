
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

const statistics = [
  {
    title: 'Total de clientes',
    value: '150',
    description: 'Clientes registrados',
    icon: Users,
    color: 'blue'
  },
  {
    title: 'Entrenadores',
    value: '8',
    description: 'Personal registrado',
    icon: UserCheck,
    color: 'green'
  },
  {
    title: 'Membresías activas',
    value: '112',
    description: 'Membresías vigentes',
    icon: CreditCard,
    color: 'purple'
  },
  {
    title: 'Ingresos del mes',
    value: '$8.450.000',
    description: 'Valor de demostración',
    icon: Wallet,
    color: 'orange'
  }
]

function Dashboard() {
  return (
    <section className="dashboard">
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

      <div className="section-heading">
        <div>
          <h2>Resumen general</h2>
          <p>Indicadores principales del gimnasio</p>
        </div>

        <span className="current-period">
          <CalendarDays size={16} />
          Vista general
        </span>
      </div>

      <div className="statistics-grid">
        {statistics.map((item) => {
          const Icon = item.icon

          return (
            <article className="stat-card" key={item.title}>
              <div className={`stat-icon ${item.color}`}>
                <Icon size={23} />
              </div>

              <div className="stat-information">
                <span>{item.title}</span>
                <strong>{item.value}</strong>
                <small>{item.description}</small>
              </div>

              <ArrowUpRight className="stat-arrow" size={19} />
            </article>
          )
        })}
      </div>

      <div className="dashboard-bottom">
        <article className="dashboard-card activity-card">
          <div className="card-heading">
            <div>
              <h3>Actividad del gimnasio</h3>
              <p>Resumen de los módulos disponibles</p>
            </div>
            <Activity size={22} />
          </div>

          <div className="activity-item">
            <span className="activity-dot blue-dot"></span>
            <div>
              <strong>Gestión de clientes</strong>
              <p>Registro y administración de usuarios</p>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-dot green-dot"></span>
            <div>
              <strong>Control de membresías</strong>
              <p>Seguimiento de planes y vencimientos</p>
            </div>
          </div>

          <div className="activity-item">
            <span className="activity-dot purple-dot"></span>
            <div>
              <strong>Seguimiento deportivo</strong>
              <p>Rutinas y evaluaciones físicas</p>
            </div>
          </div>
        </article>

        <article className="dashboard-card system-card">
          <div className="card-heading">
            <div>
              <h3>Power Gym</h3>
              <p>Plataforma de administración</p>
            </div>
            <TrendingUp size={22} />
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
