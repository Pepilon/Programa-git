
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar sesión | Power Gym</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #101820;
            font-family: Arial, sans-serif;
            color: white;
        }

        .login-container {
            width: 90%;
            max-width: 400px;
            padding: 35px;
            background: #1c2935;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        h1 {
            text-align: center;
            color: #f5a623;
        }

        p {
            text-align: center;
            color: #c5cbd0;
        }

        label {
            display: block;
            margin-top: 20px;
        }

        input {
            width: 100%;
            padding: 13px;
            margin-top: 8px;
            border: 1px solid #526170;
            border-radius: 6px;
            background: #101820;
            color: white;
        }

        button {
            width: 100%;
            padding: 14px;
            margin-top: 25px;
            border: none;
            border-radius: 6px;
            background: #f5a623;
            font-weight: bold;
            cursor: pointer;
        }

        button:hover {
            background: #e69516;
        }

        .error {
            padding: 10px;
            margin-top: 15px;
            background: #702d2d;
            border-radius: 6px;
            color: white;
            text-align: center;
        }
    </style>
</head>

<body>
    <main class="login-container">

        <h1>POWER GYM</h1>
        <p>Ingresa a tu cuenta</p>

        <c:if test="${not empty error}">
            <div class="error">
                <c:out value="${error}"/>
            </div>
        </c:if>

        <form action="${pageContext.request.contextPath}/login" method="post">

            <label for="email">Correo electrónico</label>
            <input
                type="email"
                id="email"
                name="email"
                required
                autocomplete="username"
            >

            <label for="password">Contraseña</label>
            <input
                type="password"
                id="password"
                name="password"
                required
                autocomplete="current-password"
            >

            <button type="submit">INICIAR SESIÓN</button>

        </form>

    </main>
</body>
</html>
