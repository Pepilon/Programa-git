const API_URL = '/api/clientes';

async function request(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'include',
    ...options,
  });

  const contenido = await response.text();
  let data = {};

  try {
    data = contenido ? JSON.parse(contenido) : {};
  } catch {
    throw new Error('El servidor devolvió una respuesta inválida.');
  }

  if (!response.ok) {
    throw new Error(data.mensaje || 'No fue posible completar la operación.');
  }

  return data;
}

export async function listarClientes() {
  return request(API_URL);
}

export async function registrarCliente(cliente) {
  return request(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
}

export async function actualizarCliente(cliente) {
  return request(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
}

export async function desactivarCliente(idCliente) {
  return request(`${API_URL}?idCliente=${encodeURIComponent(idCliente)}`, {
    method: 'DELETE',
  });
}
