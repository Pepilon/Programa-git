
const API_URL = '/api/auth'

// Procesa las respuestas del servidor y controla errores de formato.
async function procesarRespuesta(response) {
  const contenido = await response.text()
  let data = {}

  try {
    data = contenido ? JSON.parse(contenido) : {}
  } catch {
    throw new Error('El servidor devolvió una respuesta inválida.')
  }

  if (!response.ok) {
    throw new Error(
      data.mensaje || 'No fue posible completar la solicitud.'
    )
  }

  return data
}

// Envía las credenciales para iniciar sesión.
export async function iniciarSesion(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })

  const data = await procesarRespuesta(response)

  return data.usuario
}

// Consulta si el usuario tiene una sesión activa.
export async function consultarSesion() {
  const response = await fetch(`${API_URL}/session`, {
    method: 'GET',
    credentials: 'include',
  })

  // El código 401 indica que no existe una sesión autenticada.
  if (response.status === 401) {
    return null
  }

  const data = await procesarRespuesta(response)

  return data.usuario
}

// Solicita al servidor cerrar la sesión actual.
export async function cerrarSesion() {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  })

  return procesarRespuesta(response)
}
