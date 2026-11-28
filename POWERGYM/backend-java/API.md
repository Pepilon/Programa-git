# Documentación de servicios web – Power Gym

## 1. Introducción

El proyecto Power Gym cuenta con una API desarrollada en Java mediante Servlets. Esta permite gestionar la autenticación de usuarios y las operaciones principales de los clientes, utilizando solicitudes HTTP e intercambio de información en formato JSON.

La API se conecta con la base de datos MySQL y utiliza sesiones HTTP para controlar el acceso a los servicios protegidos.

## 2. Tecnologías utilizadas

- Java 21.
- Jakarta Servlet.
- Apache Tomcat 10.
- MySQL.
- Jackson para procesar información JSON.
- JDBC para la conexión con la base de datos.
- Git y GitHub para el control de versiones.

## 3. Servicios de autenticación

### 3.1 Inicio de sesión

- **Ruta:** `/api/auth/login`
- **Método:** POST
- **Acceso:** Público.
- **Formato:** JSON.

**Datos de entrada:**

```json
{
  "email": "usuario@correo.com",
  "password": "123456"
}
```

**Funcionamiento:**

El servicio recibe el correo y la contraseña, valida las credenciales mediante el servicio de autenticación y, si son correctas, crea una sesión HTTP. La sesión almacena los datos del usuario y tiene un tiempo de inactividad de 30 minutos.

**Respuesta exitosa:**

```json
{
  "mensaje": "Inicio de sesión correcto.",
  "usuario": {
    "idUsuario": 1,
    "nombre": "Andres",
    "apellido": "Osorio",
    "email": "usuario@correo.com",
    "rol": "ADMIN"
  }
}
```

**Códigos de respuesta:**
- 200: inicio de sesión correcto.
- 400: faltan datos o el formato enviado no es válido.
- 401: credenciales incorrectas.

### 3.2 Cierre de sesión

- **Ruta:** `/api/auth/logout`
- **Método:** POST.
- **Acceso:** Sesión HTTP.

**Funcionamiento:**

El servicio obtiene la sesión actual y la invalida para cerrar la sesión del usuario.

**Respuesta:**

```json
{
  "mensaje": "Sesión cerrada correctamente."
}
```

**Código de respuesta:**
- 200: solicitud procesada correctamente.

### 3.3 Consulta de sesión

- **Ruta:** `/api/auth/session`
- **Método:** GET.
- **Acceso:** Sesión HTTP.

**Funcionamiento:**

Comprueba si existe una sesión activa y si contiene un usuario autenticado.

**Respuesta exitosa:**

```json
{
  "usuario": {
    "idUsuario": 1,
    "nombre": "Andres",
    "apellido": "Osorio",
    "email": "usuario@correo.com",
    "rol": "ADMIN"
  }
}
```

**Códigos de respuesta:**
- 200: existe una sesión activa.
- 401: no existe una sesión válida.

## 4. Servicios de gestión de clientes

Los servicios de clientes requieren una sesión activa y permiten el acceso a usuarios con los roles ADMIN y ENTRENADOR.

### 4.1 Consultar clientes

- **Ruta:** `/api/clientes`
- **Método:** GET.

**Funcionamiento:**

Consulta los clientes registrados y devuelve la información en formato JSON.

**Códigos de respuesta:**
- 200: consulta realizada.
- 401: no existe una sesión activa.
- 403: el usuario no tiene permisos.
- 500: error al consultar la información.

### 4.2 Registrar cliente

- **Ruta:** `/api/clientes`
- **Método:** POST.
- **Formato:** JSON.

**Datos de entrada:**

```json
{
  "nombre": "Andres",
  "apellido": "Osorio",
  "documento": "123456789",
  "email": "cliente@correo.com",
  "telefono": "3001234567",
  "password": "123456",
  "fechaNacimiento": "1996-05-20",
  "genero": "MASCULINO",
  "peso": "70.5",
  "altura": "1.75",
  "objetivo": "Aumentar masa muscular"
}
```

**Funcionamiento:**

Recibe los datos personales y físicos del cliente. Los campos nombre, apellido, documento, email y password son obligatorios. Los demás datos del ejemplo son opcionales. El servicio registra la información del usuario y su perfil de cliente.

**Códigos de respuesta:**
- 201: cliente registrado.
- 400: información incompleta o inválida.
- 401: no existe una sesión activa.
- 403: permisos insuficientes.
- 409: documento o correo ya registrados.
- 500: error interno al procesar la operación.

### 4.3 Actualizar cliente

- **Ruta:** `/api/clientes`
- **Método:** PUT.
- **Formato:** JSON.

**Datos de entrada:**

```json
{
  "idCliente": 1,
  "nombre": "Andres",
  "apellido": "Osorio",
  "documento": "123456789",
  "email": "cliente@correo.com",
  "telefono": "3001234567",
  "fechaNacimiento": "1996-05-20",
  "genero": "MASCULINO",
  "peso": "72.0",
  "altura": "1.75",
  "objetivo": "Aumentar masa muscular"
}
```

**Funcionamiento:**

Busca el cliente mediante su identificador y actualiza sus datos personales y físicos. El identificador y los campos nombre, apellido, documento y email son obligatorios.

**Códigos de respuesta:**
- 200: cliente actualizado.
- 400: información inválida o actualización no realizada.
- 401: no existe una sesión activa.
- 403: permisos insuficientes.
- 404: cliente inexistente.
- 409: documento o correo duplicado.
- 500: error interno al procesar la operación.

### 4.4 Desactivar cliente

- **Ruta:** `/api/clientes?idCliente=1`
- **Método:** DELETE.

**Funcionamiento:**

Recibe el identificador del cliente como parámetro de consulta y realiza su desactivación. Esta operación permite conservar el historial del cliente sin eliminar físicamente sus registros.

**Códigos de respuesta:**
- 200: cliente desactivado.
- 400: falta el identificador o no tiene un formato válido.
- 401: no existe una sesión activa.
- 403: permisos insuficientes.
- 404: no se pudo desactivar el cliente.
- 409: conflicto de datos.
- 500: error interno al procesar la operación.

## 5. Seguridad y control de acceso

La API implementa los siguientes controles:

- Validación de correo y contraseña durante el inicio de sesión.
- Manejo de sesiones HTTP.
- Tiempo máximo de inactividad de 30 minutos.
- Verificación de sesión antes de permitir operaciones sobre clientes.
- Restricción de gestión de clientes a los roles ADMIN y ENTRENADOR.
- Uso de contraseñas protegidas mediante el mecanismo de autenticación del proyecto.

## 6. Control de versiones

El código fuente del proyecto se encuentra administrado mediante Git y alojado en GitHub. Esto permite conservar los cambios realizados, consultar el historial de modificaciones y mantener una copia remota del proyecto.

**Repositorio:**

https://github.com/Pepilon/Programa-git

## 7. Conclusión

La API de Power Gym permite realizar las operaciones principales de autenticación y gestión de clientes. Su desarrollo mediante Java, Servlets y MySQL facilita la comunicación entre el frontend React y el backend, manteniendo la información centralizada y controlando el acceso mediante sesiones y roles de usuario.