
package com.powergym.controlador;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.powergym.modelo.Usuario;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.Map;

@WebServlet("/api/auth/session")
public class AuthSesionApiServlet extends HttpServlet {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        HttpSession sesion = request.getSession(false);

        if (sesion == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            mapper.writeValue(response.getWriter(),
                    Map.of("mensaje", "No hay una sesión activa."));
            return;
        }

        Usuario usuario = (Usuario) sesion.getAttribute("usuario");

        if (usuario == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            mapper.writeValue(response.getWriter(),
                    Map.of("mensaje", "No hay una sesión activa."));
            return;
        }

        mapper.writeValue(response.getWriter(), Map.of(
                "usuario", Map.of(
                        "idUsuario", usuario.getIdUsuario(),
                        "nombre", usuario.getNombre(),
                        "apellido", usuario.getApellido(),
                        "email", usuario.getEmail(),
                        "rol", usuario.getRol()
                )
        ));
    }
}
