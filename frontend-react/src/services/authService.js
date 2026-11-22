
const API_URL = '/api/auth'

export async function iniciarSesion(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.mensaje || 'No fue posible iniciar sesión.')
  }

  return data.usuario
}

export async function consultarSesion() {
  const response = await fetch(`${API_URL}/session`, {
    method: 'GET',
    credentials: 'include',
  })

  if (response.status === 401) {
    return null
  }

  if (!response.ok) {
    throw new Error('No fue posible consultar la sesión.')
  }

  const data = await response.json()
  return data.usuario
}


export async function cerrarSesion() {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('No fue posible cerrar la sesión.')
  }

  return response.json()
}
