
import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate
} from 'react-router-dom'

import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import Dashboard from './pages/Dashboard'
import Clientes from './pages/Clientes'
import Login from './pages/Login'

import {
  consultarSesion,
  cerrarSesion
} from './services/authService'

import './App.css'

function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [errorConexion, setErrorConexion] = useState('')

  const verificarSesion = async () => {
    setCargando(true)
    setErrorConexion('')

    try {
      const usuarioActual = await consultarSesion()
      setUsuario(usuarioActual)
    } catch {
      setErrorConexion(
        'No fue posible conectar con el servidor. Verifica que Tomcat esté funcionando.'
      )
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    let activo = true

    consultarSesion()
      .then((usuarioActual) => {
        if (activo) {
          setUsuario(usuarioActual)
        }
      })
      .catch(() => {
        if (activo) {
          setErrorConexion(
            'No fue posible conectar con el servidor. Verifica que Tomcat esté funcionando.'
          )
        }
      })
      .finally(() => {
        if (activo) {
          setCargando(false)
        }
      })

    return () => {
      activo = false
    }
  }, [])

  const handleLogin = (usuarioAutenticado) => {
    setUsuario(usuarioAutenticado)
    setErrorConexion('')
  }

  const handleLogout = async () => {
    try {
      await cerrarSesion()
      setUsuario(null)
      navigate('/', { replace: true })
    } catch (error) {
      alert(error.message)
    }
  }

  const pageTitles = {
    '/': {
      title: 'Panel principal',
      subtitle: 'Resumen general de Power Gym'
    },
    '/clientes': {
      title: 'Clientes',
      subtitle: 'Administración de clientes'
    },
    '/entrenadores': {
      title: 'Entrenadores',
      subtitle: 'Administración del personal'
    },
    '/membresias': {
      title: 'Membresías',
      subtitle: 'Control de planes y membresías'
    },
    '/rutinas': {
      title: 'Rutinas',
      subtitle: 'Planificación de entrenamientos'
    },
    '/ejercicios': {
      title: 'Ejercicios',
      subtitle: 'Biblioteca de ejercicios'
    },
    '/asistencias': {
      title: 'Asistencias',
      subtitle: 'Control de asistencia'
    },
    '/pagos': {
      title: 'Pagos',
      subtitle: 'Administración de pagos'
    },
    '/evaluaciones': {
      title: 'Evaluaciones',
      subtitle: 'Seguimiento físico de clientes'
    }
  }

  if (cargando) {
    return <div className="auth-loading">Verificando sesión...</div>
  }

  if (errorConexion) {
    return (
      <div className="auth-loading">
        <p>{errorConexion}</p>
        <button type="button" onClick={verificarSesion}>
          Reintentar conexión
        </button>
      </div>
    )
  }

  if (!usuario) {
    return <Login onLogin={handleLogin} />
  }

  const currentPage = pageTitles[location.pathname] || pageTitles['/']

  return (
    <div className="app-container">
      <div className="sidebar-wrapper">
        <Sidebar
          activePath={location.pathname}
          onNavigate={navigate}
          onLogout={handleLogout}
        />
      </div>

      <main className="main-content">
        <Header
          title={currentPage.title}
          subtitle={currentPage.subtitle}
          usuario={usuario}
        />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  )
}

export default App
