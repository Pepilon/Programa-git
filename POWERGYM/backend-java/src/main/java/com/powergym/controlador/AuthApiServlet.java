
package com.powergym.controlador;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.powergym.modelo.Usuario;
import com.powergym.servicio.AutenticacionServicio;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.Map;

@WebServlet("/api/auth/login")
public class AuthApiServlet extends HttpServlet {

    private final AutenticacionServicio autenticacionServicio =
            new AutenticacionServicio();

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            Map<String, String> datos = mapper.readValue(
                    request.getInputStream(),
                    mapper.getTypeFactory().constructMapType(
                            Map.class, String.class, String.class
                    )
            );

            String email = datos.get("email");
            String password = datos.get("password");

            if (email == null || email.isBlank()
                    || password == null || password.isBlank()) {

                response.setStatus(
                        HttpServletResponse.SC_BAD_REQUEST);

                mapper.writeValue(response.getWriter(),
                        Map.of("mensaje",
                                "Correo y contraseña son obligatorios."));
                return;
            }

            Usuario usuario =
                    autenticacionServicio.iniciarSesion(email, password);

            if (usuario == null) {
                response.setStatus(
                        HttpServletResponse.SC_UNAUTHORIZED);

                mapper.writeValue(response.getWriter(),
                        Map.of("mensaje",
                                "Correo o contraseña incorrectos."));
                return;
            }

            HttpSession sesionAnterior =
                    request.getSession(false);

            if (sesionAnterior != null) {
                sesionAnterior.invalidate();
            }

            HttpSession sesion = request.getSession(true);
            sesion.setAttribute("usuario", usuario);
            sesion.setMaxInactiveInterval(30 * 60);

            mapper.writeValue(response.getWriter(), Map.of(
                    "mensaje", "Inicio de sesión correcto.",
                    "usuario", Map.of(
                            "idUsuario", usuario.getIdUsuario(),
                            "nombre", usuario.getNombre(),
                            "apellido", usuario.getApellido(),
                            "email", usuario.getEmail(),
                            "rol", usuario.getRol()
                    )
            ));

        } catch (IllegalArgumentException e) {

            response.setStatus(
                    HttpServletResponse.SC_BAD_REQUEST);

            mapper.writeValue(response.getWriter(),
                    Map.of("mensaje", "Los datos enviados no son válidos."));

        } catch (java.sql.SQLException e) {

            throw new ServletException(
                    "Error al validar las credenciales.", e);
        }
    }
}
