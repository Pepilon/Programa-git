
package com.powergym.controlador;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.powergym.dao.ClienteDAO;
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
import java.util.Map;

@WebServlet("/api/clientes")
public class ClienteApiServlet extends HttpServlet {

    private final ClienteDAO clienteDAO = new ClienteDAO();
    private final ClienteServicio clienteServicio = new ClienteServicio();

    private final ObjectMapper mapper = new ObjectMapper()
            .registerModule(
                    new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule())
            .disable(
                    com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    // Consulta todos los clientes.
    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        prepararRespuesta(response);

        if (!verificarPermisos(request, response)) {
            return;
        }

        try {
            mapper.writeValue(
                    response.getWriter(),
                    clienteDAO.listarRespuestas()
            );

        } catch (SQLException e) {
            responderError(response, 500,
                    "Error al consultar los clientes.");
        }
    }

    // Registra un cliente nuevo.
    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        prepararRespuesta(response);

        if (!verificarPermisos(request, response)) {
            return;
        }

        try {
            JsonNode datos = leerJson(request);

            Usuario usuario = new Usuario(
                    textoObligatorio(datos, "nombre"),
                    textoObligatorio(datos, "apellido"),
                    textoObligatorio(datos, "documento"),
                    textoObligatorio(datos, "email"),
                    textoOpcional(datos, "telefono"),
                    textoObligatorio(datos, "password")
            );

            Cliente cliente = crearCliente(datos);

            if (!clienteServicio.registrarCompleto(usuario, cliente)) {
                responderError(response, 400,
                        "No se pudo registrar el cliente.");
                return;
            }

            response.setStatus(HttpServletResponse.SC_CREATED);

            mapper.writeValue(response.getWriter(),
                    Map.of("mensaje", "Cliente registrado correctamente."));

        } catch (IllegalArgumentException | DateTimeParseException e) {
            responderError(response, 400, e.getMessage());

        } catch (IOException e) {
            responderError(response, 400,
                    "Los datos enviados no tienen un formato JSON válido.");

        } catch (SQLException e) {
            manejarErrorSQL(response, e);
        }
    }

    // Actualiza los datos personales y físicos.
    @Override
    protected void doPut(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        prepararRespuesta(response);

        if (!verificarPermisos(request, response)) {
            return;
        }

        try {
            JsonNode datos = leerJson(request);

            int idCliente = enteroObligatorio(datos, "idCliente");

            Cliente clienteExistente =
                    clienteServicio.consultar(idCliente);

            if (clienteExistente == null) {
                responderError(response, 404,
                        "El cliente no existe.");
                return;
            }

            Usuario usuario = new Usuario();

            usuario.setIdUsuario(clienteExistente.getIdUsuario());
            usuario.setNombre(textoObligatorio(datos, "nombre"));
            usuario.setApellido(textoObligatorio(datos, "apellido"));
            usuario.setDocumento(textoObligatorio(datos, "documento"));
            usuario.setEmail(textoObligatorio(datos, "email"));
            usuario.setTelefono(textoOpcional(datos, "telefono"));

            Cliente cliente = crearCliente(datos);

            cliente.setIdCliente(idCliente);
            cliente.setIdUsuario(clienteExistente.getIdUsuario());

            if (!clienteServicio.actualizar(usuario, cliente)) {
                responderError(response, 400,
                        "No se pudo actualizar el cliente.");
                return;
            }

            mapper.writeValue(response.getWriter(),
                    Map.of("mensaje", "Cliente actualizado correctamente."));

        } catch (IllegalArgumentException | DateTimeParseException e) {
            responderError(response, 400, e.getMessage());

        } catch (IOException e) {
            responderError(response, 400,
                    "Los datos enviados no tienen un formato JSON válido.");

        } catch (SQLException e) {
            manejarErrorSQL(response, e);
        }
    }

    // Desactiva un cliente sin eliminar su historial.
    @Override
    protected void doDelete(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        prepararRespuesta(response);

        if (!verificarPermisos(request, response)) {
            return;
        }

        try {
            String valor = request.getParameter("idCliente");

            if (valor == null || valor.isBlank()) {
                responderError(response, 400,
                        "Debe proporcionar el ID del cliente.");
                return;
            }

            int idCliente = Integer.parseInt(valor);

            if (!clienteServicio.desactivar(idCliente)) {
                responderError(response, 404,
                        "No se pudo desactivar el cliente.");
                return;
            }

            mapper.writeValue(response.getWriter(),
                    Map.of("mensaje", "Cliente desactivado correctamente."));

        } catch (NumberFormatException e) {
            responderError(response, 400,
                    "El ID del cliente no es válido.");

        } catch (SQLException e) {
            manejarErrorSQL(response, e);
        }
    }

    // Verifica que exista una sesión y que el usuario tenga permisos.
    private boolean verificarPermisos(
            HttpServletRequest request,
            HttpServletResponse response)
            throws IOException {

        HttpSession sesion = request.getSession(false);

        if (sesion == null
                || sesion.getAttribute("usuario") == null) {

            responderError(response, 401,
                    "Debes iniciar sesión.");

            return false;
        }

        Usuario usuario = (Usuario) sesion.getAttribute("usuario");

        if (!"ADMIN".equals(usuario.getRol())
                && !"ENTRENADOR".equals(usuario.getRol())) {

            responderError(response, 403,
                    "No tienes permisos para gestionar clientes.");

            return false;
        }

        return true;
    }

    // Convierte el JSON recibido.
    private JsonNode leerJson(HttpServletRequest request)
            throws IOException {

        JsonNode datos = mapper.readTree(request.getReader());

        if (datos == null || !datos.isObject()) {
            throw new IllegalArgumentException(
                    "Debe enviar un objeto JSON válido.");
        }

        return datos;
    }

    // Construye el perfil físico del cliente.
    private Cliente crearCliente(JsonNode datos) {

        Cliente cliente = new Cliente();

        String fecha = textoOpcional(datos, "fechaNacimiento");
        String peso = textoOpcional(datos, "peso");
        String altura = textoOpcional(datos, "altura");

        cliente.setFechaNacimiento(
                fecha == null ? null : LocalDate.parse(fecha));

        cliente.setGenero(textoOpcional(datos, "genero"));

        cliente.setPeso(
                peso == null ? null : new BigDecimal(peso));

        cliente.setAltura(
                altura == null ? null : new BigDecimal(altura));

        cliente.setObjetivo(textoOpcional(datos, "objetivo"));

        return cliente;
    }

    private String textoObligatorio(JsonNode datos, String campo) {

        String valor = textoOpcional(datos, campo);

        if (valor == null) {
            throw new IllegalArgumentException(
                    "El campo " + campo + " es obligatorio.");
        }

        return valor;
    }

    private String textoOpcional(JsonNode datos, String campo) {

        JsonNode valor = datos.get(campo);

        if (valor == null || valor.isNull()) {
            return null;
        }

        String texto = valor.asText().trim();

        return texto.isEmpty() ? null : texto;
    }

    private int enteroObligatorio(JsonNode datos, String campo) {

        String valor = textoObligatorio(datos, campo);

        try {
            return Integer.parseInt(valor);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException(
                    "El campo " + campo + " debe ser un número entero.");
        }
    }

    private void prepararRespuesta(HttpServletResponse response) {

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
    }

    private void responderError(
            HttpServletResponse response,
            int estado,
            String mensaje) throws IOException {

        response.setStatus(estado);

        mapper.writeValue(response.getWriter(),
                Map.of("mensaje", mensaje == null
                        ? "Ocurrió un error." : mensaje));
    }

    private void manejarErrorSQL(
            HttpServletResponse response,
            SQLException e) throws IOException {

        if ("23000".equals(e.getSQLState())) {
            responderError(response, 409,
                    "El documento o correo electrónico ya está registrado.");
        } else {
            responderError(response, 500,
                    "Ocurrió un error al procesar la operación.");
        }
    }
}
