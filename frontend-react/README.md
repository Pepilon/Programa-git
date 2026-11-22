# Power Gym – Frontend

## 1. Descripción del proyecto

Power Gym es un sistema de gestión para un gimnasio, desarrollado como proyecto formativo del programa Tecnología en Análisis y Desarrollo de Software del SENA.

El frontend está construido con React y Vite. Permite iniciar sesión, consultar el panel principal y administrar la información de los clientes mediante operaciones de registro, consulta, actualización y desactivación.

## 2. Tecnologías utilizadas

- React.
- JavaScript.
- Vite.
- React Router DOM.
- Lucide React.
- CSS.
- ESLint.

## 3. Requisitos para ejecutar el proyecto

Antes de iniciar, se necesita tener instalado:

- Node.js y npm.
- Backend Java de Power Gym.
- Apache Tomcat 10.
- MySQL con la base de datos `powergym`.

El backend debe estar desplegado en Tomcat con el contexto `/powergym`, utilizando el puerto `8080`.

## 4. Instalación

Abrir una terminal dentro de la carpeta `frontend-react` y ejecutar:

```bash
npm install
```

Este comando instala las dependencias necesarias para ejecutar el proyecto.

## 5. Ejecución del proyecto

Para iniciar el servidor de desarrollo, ejecutar:

```bash
npm run dev
```

Vite mostrará la dirección local para ingresar a la aplicación. El puerto puede variar si el puerto predeterminado está ocupado.

## 6. Conexión con el backend

La aplicación utiliza las rutas `/api` para comunicarse con el backend Java.

La configuración del proxy se encuentra en `vite.config.js` y dirige las solicitudes hacia:

`http://localhost:8080/powergym`

De esta manera, el frontend puede comunicarse con los servicios de autenticación y gestión de clientes.

## 7. Funcionalidades implementadas

- Inicio y cierre de sesión.
- Consulta de sesión activa.
- Panel principal.
- Listado de clientes.
- Búsqueda de clientes.
- Registro de clientes.
- Edición de clientes.
- Desactivación lógica de clientes.
- Validación de datos en formularios.
- Manejo de mensajes de error y confirmación.

## 8. Verificación del código

Para ejecutar el análisis de calidad con ESLint:

```bash
npm run lint
```

Para generar la compilación de producción:

```bash
npm run build
```

Los archivos generados se almacenan en la carpeta `dist`.

## 9. Estructura principal

```text
frontend-react/
├── public/
├── src/
│   ├── components/
│   │   └── layout/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Clientes.jsx
│   ├── services/
│   │   ├── authService.js
│   │   └── clienteService.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 10. Repositorio

El código fuente del proyecto Power Gym se encuentra disponible en GitHub:

https://github.com/Pepilon/Programa-git.git

## 11. Observación

Para utilizar todas las funcionalidades de la aplicación es necesario iniciar el backend Java y contar con la conexión a la base de datos MySQL. El frontend por sí solo no ejecuta las operaciones de almacenamiento de información.