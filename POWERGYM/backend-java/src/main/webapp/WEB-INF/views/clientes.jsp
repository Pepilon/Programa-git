
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clientes | Power Gym</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 25px;
            background: #101820;
            color: white;
            font-family: Arial, sans-serif;
        }

        .contenedor {
            max-width: 1200px;
            margin: 25px auto;
            padding: 25px;
            background: #1c2935;
            border-radius: 10px;
        }

        h1 {
            color: #f5a623;
            text-align: center;
        }

        h2 {
            color: #f5a623;
            margin-top: 25px;
        }

        .formulario {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }

        .campo {
            display: flex;
            flex-direction: column;
            gap: 7px;
        }

        .campo label {
            font-weight: bold;
        }

        input, select, textarea {
            width: 100%;
            padding: 11px;
            border: 1px solid #526170;
            border-radius: 5px;
            background: #101820;
            color: white;
        }

        textarea {
            resize: vertical;
        }

        button, .boton {
            padding: 11px 16px;
            border: none;
            border-radius: 5px;
            background: #f5a623;
            color: #101820;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
        }

        button:hover, .boton:hover {
            background: #ffc15a;
        }

        .boton-secundario {
            background: #526170;
            color: white;
        }

        .acciones {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 15px;
        }

        .tabla-contenedor {
            overflow-x: auto;
            margin-top: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 900px;
        }

        th, td {
            padding: 12px;
            border-bottom: 1px solid #526170;
            text-align: left;
        }

        th {
            color: #f5a623;
        }

        .mensaje {
            padding: 12px;
            margin: 15px 0;
            border-radius: 5px;
            background: #263b4d;
            color: #ffffff;
        }

        .error {
            background: #542c2c;
            color: #ffd0d0;
        }

        .acciones-tabla {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        .acciones-tabla form {
            margin: 0;
        }

        .boton-eliminar {
            background: #d9534f;
            color: white;
        }

        .boton-eliminar:hover {
            background: #ef7773;
        }

        .barra-superior {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            flex-wrap: wrap;
        }

        @media (max-width: 650px) {
            body {
                padding: 10px;
            }

            .contenedor {
                padding: 15px;
            }

            .formulario {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>

<body>

<main class="contenedor">

    <h1>POWER GYM</h1>

    <div class="barra-superior">
        <h2>Gestión de clientes</h2>

        <form action="${pageContext.request.contextPath}/logout"
              method="post">

            <button type="submit">CERRAR SESIÓN</button>
        </form>
    </div>

    <c:if test="${not empty error}">
        <div class="mensaje error">
            <c:out value="${error}"/>
        </div>
    </c:if>

    <c:if test="${not empty mensaje}">
        <div class="mensaje">
            <c:out value="${mensaje}"/>
        </div>
        <c:remove var="mensaje" scope="session"/>
    </c:if>

    <h2>
        <c:choose>
            <c:when test="${not empty clienteEditar}">
                Actualizar cliente
            </c:when>
            <c:otherwise>
                Registrar nuevo cliente
            </c:otherwise>
        </c:choose>
    </h2>

    <form action="${pageContext.request.contextPath}/clientes"
          method="post">

        <c:choose>
            <c:when test="${not empty clienteEditar}">
                <input type="hidden" name="accion" value="actualizar">
                <input type="hidden" name="idCliente"
                       value="${clienteEditar.idCliente}">
            </c:when>
            <c:otherwise>
                <input type="hidden" name="accion" value="registrar">
            </c:otherwise>
        </c:choose>

        <div class="formulario">

            <c:if test="${empty clienteEditar}">
                <div class="campo">
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre"
                           maxlength="50" required>
                </div>

                <div class="campo">
                    <label for="apellido">Apellido</label>
                    <input type="text" id="apellido" name="apellido"
                           maxlength="50" required>
                </div>

                <div class="campo">
                    <label for="documento">Documento</label>
                    <input type="text" id="documento" name="documento"
                           maxlength="20" required>
                </div>

                <div class="campo">
                    <label for="email">Correo electrónico</label>
                    <input type="email" id="email" name="email"
                           maxlength="100" required>
                </div>

                <div class="campo">
                    <label for="telefono">Teléfono</label>
                    <input type="tel" id="telefono" name="telefono"
                           maxlength="20">
                </div>

                <div class="campo">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password"
                           minlength="8" maxlength="72" required>
                </div>
            </c:if>

            <div class="campo">
                <label for="fechaNacimiento">Fecha de nacimiento</label>
                <input type="date" id="fechaNacimiento"
                       name="fechaNacimiento"
                       value="${clienteEditar.fechaNacimiento}">
            </div>

            <div class="campo">
                <label for="genero">Género</label>
                <select id="genero" name="genero">
                    <option value="">Seleccione</option>

                    <option value="MASCULINO"
                        ${clienteEditar.genero == 'MASCULINO' ? 'selected' : ''}>
                        Masculino
                    </option>

                    <option value="FEMENINO"
                        ${clienteEditar.genero == 'FEMENINO' ? 'selected' : ''}>
                        Femenino
                    </option>

                    <option value="OTRO"
                        ${clienteEditar.genero == 'OTRO' ? 'selected' : ''}>
                        Otro
                    </option>
                </select>
            </div>

            <div class="campo">
                <label for="peso">Peso (kg)</label>
                <input type="number" id="peso" name="peso"
                       min="0.01" step="0.01"
                       value="${clienteEditar.peso}">
            </div>

            <div class="campo">
                <label for="altura">Altura (m)</label>
                <input type="number" id="altura" name="altura"
                       min="0.01" step="0.01"
                       value="${clienteEditar.altura}">
            </div>

            <div class="campo">
                <label for="objetivo">Objetivo</label>
                <textarea id="objetivo" name="objetivo"
                          maxlength="150" rows="3"><c:out value="${clienteEditar.objetivo}"/></textarea>
            </div>

        </div>

        <div class="acciones">
            <button type="submit">
                <c:choose>
                    <c:when test="${not empty clienteEditar}">
                        GUARDAR CAMBIOS
                    </c:when>
                    <c:otherwise>
                        REGISTRAR CLIENTE
                    </c:otherwise>
                </c:choose>
            </button>

            <c:if test="${not empty clienteEditar}">
                <a class="boton boton-secundario"
                   href="${pageContext.request.contextPath}/clientes">
                    CANCELAR
                </a>
            </c:if>
        </div>

    </form>

    <h2>Clientes registrados</h2>

    <c:choose>

        <c:when test="${not empty clientes}">

            <div class="tabla-contenedor">

                <table>
                    <thead>
                        <tr>
                            <th>ID Cliente</th>
                            <th>ID Usuario</th>
                            <th>Fecha de nacimiento</th>
                            <th>Género</th>
                            <th>Peso (kg)</th>
                            <th>Altura (m)</th>
                            <th>Objetivo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

                        <c:forEach var="cliente" items="${clientes}">

                            <tr>
                                <td><c:out value="${cliente.idCliente}"/></td>
                                <td><c:out value="${cliente.idUsuario}"/></td>
                                <td><c:out value="${cliente.fechaNacimiento}"/></td>
                                <td><c:out value="${cliente.genero}"/></td>
                                <td><c:out value="${cliente.peso}"/></td>
                                <td><c:out value="${cliente.altura}"/></td>
                                <td><c:out value="${cliente.objetivo}"/></td>

                                <td>
                                    <div class="acciones-tabla">

                                        <a class="boton"
                                           href="${pageContext.request.contextPath}/clientes?accion=editar&idCliente=${cliente.idCliente}">
                                            EDITAR
                                        </a>

                                        <form action="${pageContext.request.contextPath}/clientes"
                                              method="post"
                                              onsubmit="return confirm('¿Desea desactivar este cliente?');">

                                            <input type="hidden"
                                                   name="accion"
                                                   value="desactivar">

                                            <input type="hidden"
                                                   name="idCliente"
                                                   value="${cliente.idCliente}">

                                            <button type="submit"
                                                    class="boton-eliminar">
                                                DESACTIVAR
                                            </button>
                                        </form>

                                    </div>
                                </td>
                            </tr>

                        </c:forEach>

                    </tbody>
                </table>

            </div>

        </c:when>

        <c:otherwise>

            <p class="mensaje">
                No hay clientes registrados.
            </p>

        </c:otherwise>

    </c:choose>

</main>

</body>
</html>
