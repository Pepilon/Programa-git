
package com.powergym.controlador;

import com.powergym.modelo.Usuario;
import com.powergym.servicio.AutenticacionServicio;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private final AutenticacionServicio autenticacionServicio =
            new AutenticacionServicio();

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        request.getRequestDispatcher("/WEB-INF/views/login.jsp")
                .forward(request, response);
    }

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        try {

            Usuario usuario =
                    autenticacionServicio.iniciarSesion(email, password);

            if (usuario != null) {

                // Invalidar la sesión anterior si existe.
                HttpSession sesionAnterior = request.getSession(false);

                if (sesionAnterior != null) {
                    sesionAnterior.invalidate();
                }

                // Crear una sesión nueva después de autenticar.
                HttpSession sesion = request.getSession(true);

                sesion.setAttribute("usuario", usuario);
                sesion.setMaxInactiveInterval(30 * 60);

                response.sendRedirect(
                        request.getContextPath() + "/clientes"
                );

            } else {

                request.setAttribute(
                        "error",
                        "Correo electrónico o contraseña incorrectos."
                );

                request.getRequestDispatcher(
                        "/WEB-INF/views/login.jsp"
                ).forward(request, response);
            }

        } catch (SQLException e) {

            throw new ServletException(
                    "Error al validar las credenciales del usuario.", e
            );
        }
    }
}
