
import { useCallback, useEffect, useState } from 'react'
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

// Controla la sesión y la navegación principal de la aplicación.
function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [errorConexion, setErrorConexion] = useState('')

  // Consulta si existe una sesión activa en el servidor.
  const verificarSesion = useCallback(async () => {
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
  }, [])

  // Verifica la sesión cuando se inicia la aplicación.
  useEffect(() => {
    verificarSesion()
  }, [verificarSesion])

  // Actualiza el estado después de iniciar sesión correctamente.
  const handleLogin = (usuarioAutenticado) => {
    setUsuario(usuarioAutenticado)
    setErrorConexion('')
  }

  // Cierra la sesión en el servidor y regresa al inicio.
  const handleLogout = async () => {
    try {
      await cerrarSesion()
      setUsuario(null)
      navigate('/', { replace: true })
    } catch (error) {
      alert(error.message)
    }
  }

  // Define los títulos y subtítulos de las páginas.
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

  // Muestra una pantalla mientras se verifica la sesión.
  if (cargando) {
    return <div className="auth-loading">Verificando sesión...</div>
  }

  // Permite volver a consultar la sesión si falla la conexión.
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

  // Si no hay una sesión activa, muestra el inicio de sesión.
  if (!usuario) {
    return <Login onLogin={handleLogin} />
  }

  const currentPage = pageTitles[location.pathname] || pageTitles['/']

  // Estructura principal para usuarios autenticados.
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

// Configura el enrutamiento general de Power Gym.
function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  )
}

export default App
