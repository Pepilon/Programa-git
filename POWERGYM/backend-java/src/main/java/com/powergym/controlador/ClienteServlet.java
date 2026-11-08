
package com.powergym.controlador;

import com.powergym.modelo.Cliente;
import com.powergym.servicio.ClienteServicio;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/clientes")
public class ClienteServlet extends HttpServlet {

    private final ClienteServicio clienteServicio = new ClienteServicio();

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession sesion = request.getSession(false);

        // Verificar que el usuario haya iniciado sesión.
        if (sesion == null || sesion.getAttribute("usuario") == null) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        try {
            // Consultar los clientes registrados.
            List<Cliente> clientes = clienteServicio.listar();

            request.setAttribute("clientes", clientes);

            // Mostrar la información en la página JSP.
            request.getRequestDispatcher(
                    "/WEB-INF/views/clientes.jsp"
            ).forward(request, response);

        } catch (SQLException e) {
            throw new ServletException(
                    "Error al consultar los clientes.", e
            );
        }
    }
}
