
package com.powergym.controlador;

import com.powergym.modelo.Cliente;
import com.powergym.modelo.Usuario;
import com.powergym.servicio.ClienteServicio;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

@WebServlet("/clientes")
public class ClienteServlet extends HttpServlet {

    private final ClienteServicio clienteServicio =
            new ClienteServicio();

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        if (!verificarSesion(request, response)) {
            return;
        }

        String accion = request.getParameter("accion");

        try {
            if ("editar".equals(accion)) {

                int idCliente = obtenerId(request);

                Cliente cliente =
                        clienteServicio.consultar(idCliente);

                if (cliente == null) {
                    request.getSession().setAttribute(
                            "mensaje", "El cliente no existe.");

                    response.sendRedirect(
                            request.getContextPath() + "/clientes");
                    return;
                }

                request.setAttribute("clienteEditar", cliente);
            }

            listarClientes(request);

            request.getRequestDispatcher(
                    "/WEB-INF/views/clientes.jsp"
            ).forward(request, response);

        } catch (IllegalArgumentException e) {

            response.sendError(
                    HttpServletResponse.SC_BAD_REQUEST,
                    e.getMessage());

        } catch (SQLException e) {

            throw new ServletException(
                    "Error al consultar los clientes.", e);
        }
    }

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        if (!verificarSesion(request, response)) {
            return;
        }

        request.setCharacterEncoding("UTF-8");

        String accion = request.getParameter("accion");

        try {
            switch (accion == null ? "" : accion) {

                case "registrar" -> registrar(request);

                case "actualizar" -> actualizar(request);

                case "desactivar" -> desactivar(request);

                default -> throw new IllegalArgumentException(
                        "La acción solicitada no es válida.");
            }

            response.sendRedirect(
                    request.getContextPath() + "/clientes");

        } catch (IllegalArgumentException
                 | DateTimeParseException e) {

            request.setAttribute("error", e.getMessage());

            try {
                listarClientes(request);

                request.getRequestDispatcher(
                        "/WEB-INF/views/clientes.jsp"
                ).forward(request, response);

            } catch (SQLException ex) {

                throw new ServletException(
                        "Error al recuperar los clientes.", ex);
            }

        } catch (SQLException e) {

            throw new ServletException(
                    "Error al gestionar el cliente.", e);
        }
    }

    private void registrar(HttpServletRequest request)
            throws SQLException {

        Usuario usuario = new Usuario(
                obtenerTexto(request, "nombre"),
                obtenerTexto(request, "apellido"),
                obtenerTexto(request, "documento"),
                obtenerTexto(request, "email"),
                request.getParameter("telefono"),
                obtenerTexto(request, "password")
        );

        Cliente cliente = crearCliente(request);

        clienteServicio.registrarCompleto(usuario, cliente);
    }

    private void actualizar(HttpServletRequest request)
            throws SQLException {

        int idCliente = obtenerId(request);

        Cliente clienteExistente =
                clienteServicio.consultar(idCliente);

        if (clienteExistente == null) {
            throw new IllegalArgumentException(
                    "El cliente no existe.");
        }

        Cliente cliente = crearCliente(request);

        cliente.setIdCliente(idCliente);
        cliente.setIdUsuario(clienteExistente.getIdUsuario());

        if (!clienteServicio.actualizar(cliente)) {
            throw new IllegalArgumentException(
                    "No se pudo actualizar el cliente.");
        }
    }

    private void desactivar(HttpServletRequest request)
            throws SQLException {

        int idCliente = obtenerId(request);

        if (!clienteServicio.desactivar(idCliente)) {
            throw new IllegalArgumentException(
                    "No se pudo desactivar el cliente.");
        }
    }

    private Cliente crearCliente(HttpServletRequest request) {

        Cliente cliente = new Cliente();

        String fecha = request.getParameter("fechaNacimiento");
        String peso = request.getParameter("peso");
        String altura = request.getParameter("altura");

        cliente.setFechaNacimiento(
                fecha == null || fecha.isBlank()
                        ? null : LocalDate.parse(fecha));

        cliente.setGenero(request.getParameter("genero"));

        cliente.setPeso(
                peso == null || peso.isBlank()
                        ? null : new BigDecimal(peso));

        cliente.setAltura(
                altura == null || altura.isBlank()
                        ? null : new BigDecimal(altura));

        cliente.setObjetivo(request.getParameter("objetivo"));

        return cliente;
    }

    private int obtenerId(HttpServletRequest request) {

        String valor = request.getParameter("idCliente");

        if (valor == null || valor.isBlank()) {
            throw new IllegalArgumentException(
                    "Debe proporcionar el ID del cliente.");
        }

        return Integer.parseInt(valor);
    }

    private String obtenerTexto(
            HttpServletRequest request,
            String campo) {

        String valor = request.getParameter(campo);

        if (valor == null || valor.isBlank()) {
            throw new IllegalArgumentException(
                    "El campo " + campo + " es obligatorio.");
        }

        return valor.trim();
    }

    private boolean verificarSesion(
            HttpServletRequest request,
            HttpServletResponse response)
            throws IOException {

        HttpSession sesion = request.getSession(false);

        if (sesion == null
                || sesion.getAttribute("usuario") == null) {

            response.sendRedirect(
                    request.getContextPath() + "/login");

            return false;
        }

        return true;
    }

    private void listarClientes(HttpServletRequest request)
            throws SQLException {

        List<Cliente> clientes = clienteServicio.listar();

        request.setAttribute("clientes", clientes);
    }
}
