
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
            padding: 30px;
            background: #101820;
            color: white;
            font-family: Arial, sans-serif;
        }

        h1 {
            color: #f5a623;
            text-align: center;
        }

        .contenedor {
            max-width: 1100px;
            margin: 30px auto;
            padding: 25px;
            background: #1c2935;
            border-radius: 10px;
        }

        .tabla-contenedor {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 750px;
        }

        th, td {
            padding: 13px;
            border-bottom: 1px solid #526170;
            text-align: left;
        }

        th {
            color: #f5a623;
        }

        .mensaje {
            padding: 15px;
            text-align: center;
            color: #c5cbd0;
        }
    </style>
</head>

<body>

    <main class="contenedor">

        <h1>POWER GYM</h1>
        <h2>Clientes registrados</h2>

<form action="${pageContext.request.contextPath}/logout" method="post"
      style="text-align: right; margin-bottom: 20px;">

    <button type="submit"
            style="padding: 12px 20px;
                   background: #f5a623;
                   color: #101820;
                   border: none;
                   border-radius: 6px;
                   font-weight: bold;
                   cursor: pointer;">
        CERRAR SESIÓN
    </button>

</form>

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
