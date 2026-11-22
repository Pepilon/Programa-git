
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dumbbell, LockKeyhole, Mail } from 'lucide-react'
import { iniciarSesion } from '../services/authService'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const usuario = await iniciarSesion(email, password)
      onLogin(usuario)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-logo">
          <Dumbbell size={34} />
        </div>

        <h1>POWER GYM</h1>
        <p>Ingresa a tu plataforma de gestión</p>

        <label htmlFor="email">Correo electrónico</label>
        <div className="login-input">
          <Mail size={19} />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="correo@ejemplo.com"
            autoComplete="username"
            required
          />
        </div>

        <label htmlFor="password">Contraseña</label>
        <div className="login-input">
          <LockKeyhole size={19} />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
            required
          />
        </div>

        {error && <div className="login-error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>
    </main>
  )
}

export default Login
