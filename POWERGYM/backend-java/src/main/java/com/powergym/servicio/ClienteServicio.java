
package com.powergym.servicio;

import com.powergym.conexion.ConexionBD;
import com.powergym.dao.ClienteDAO;
import com.powergym.dao.UsuarioDAO;
import com.powergym.modelo.Cliente;
import com.powergym.modelo.Usuario;

import org.mindrot.jbcrypt.BCrypt;

import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Set;

public class ClienteServicio {

    private final ClienteDAO clienteDAO;
    private final UsuarioDAO usuarioDAO;

    private static final Set<String> GENEROS_VALIDOS =
            Set.of("MASCULINO", "FEMENINO", "OTRO");

    public ClienteServicio() {
        this.clienteDAO = new ClienteDAO();
        this.usuarioDAO = new UsuarioDAO();
    }

    // Registra usuario y cliente dentro de una sola transacción.
    public boolean registrarCompleto(
            Usuario usuario, Cliente cliente) throws SQLException {

        validarUsuario(usuario);
        validar(cliente, false);

        String passwordOriginal = usuario.getPassword();

        String passwordEncriptada = BCrypt.hashpw(
                passwordOriginal,
                BCrypt.gensalt(12)
        );

        try (Connection conexion = ConexionBD.obtenerConexion()) {

            conexion.setAutoCommit(false);

            try {
                usuario.setPassword(passwordEncriptada);

                usuarioDAO.insertar(conexion, usuario);

                cliente.setIdUsuario(usuario.getIdUsuario());

                // Verificar que el cliente tenga un usuario asociado.
                validar(cliente, true);

                boolean clienteInsertado =
                        clienteDAO.insertar(conexion, cliente);

                if (!clienteInsertado) {
                    throw new SQLException(
                            "No se pudo registrar el perfil del cliente.");
                }

                conexion.commit();

                return true;

            } catch (SQLException | RuntimeException e) {

                try {
                    conexion.rollback();
                } catch (SQLException errorRollback) {
                    e.addSuppressed(errorRollback);
                }

                throw e;

            } finally {
                usuario.setPassword(passwordOriginal);
            }
        }
    }

    // Consulta un cliente por su identificador.
    public Cliente consultar(int idCliente) throws SQLException {

        validarIdentificador(idCliente);

        return clienteDAO.buscarPorId(idCliente);
    }

    // Consulta todos los clientes.
    public List<Cliente> listar() throws SQLException {

        return clienteDAO.listarTodos();
    }

    // Actualiza la información de un cliente.
    public boolean actualizar(Cliente cliente) throws SQLException {

        if (cliente == null) {
            throw new IllegalArgumentException(
                    "El cliente no puede ser nulo.");
        }

        validarIdentificador(cliente.getIdCliente());
        validar(cliente, true);

        return clienteDAO.actualizar(cliente);
    }

    // Desactiva un cliente sin eliminar su historial.
    public boolean desactivar(int idCliente) throws SQLException {

        validarIdentificador(idCliente);

        Cliente cliente = clienteDAO.buscarPorId(idCliente);

        if (cliente == null) {
            return false;
        }

        return usuarioDAO.desactivar(cliente.getIdUsuario());
    }

    // Reactiva un cliente previamente desactivado.
    public boolean reactivar(int idCliente) throws SQLException {

        validarIdentificador(idCliente);

        Cliente cliente = clienteDAO.buscarPorId(idCliente);

        if (cliente == null) {
            return false;
        }

        return usuarioDAO.activar(cliente.getIdUsuario());
    }

    // Valida los datos del usuario.
    private void validarUsuario(Usuario usuario) {

        if (usuario == null) {
            throw new IllegalArgumentException(
                    "El usuario no puede ser nulo.");
        }

        validarTexto(usuario.getNombre(), 50, "Nombre");
        validarTexto(usuario.getApellido(), 50, "Apellido");
        validarTexto(usuario.getDocumento(), 20, "Documento");
        validarTexto(usuario.getEmail(), 100, "Correo electrónico");

        if (!usuario.getEmail().matches(
                "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {

            throw new IllegalArgumentException(
                    "El correo electrónico no tiene un formato válido.");
        }

        if (usuario.getPassword() == null
                || usuario.getPassword().length() < 8
                || usuario.getPassword().getBytes(
                        StandardCharsets.UTF_8).length > 72) {

            throw new IllegalArgumentException(
                    "La contraseña debe tener mínimo 8 caracteres "
                            + "y máximo 72 bytes en UTF-8.");
        }

        if (usuario.getTelefono() != null
                && usuario.getTelefono().length() > 20) {

            throw new IllegalArgumentException(
                    "El teléfono no puede superar 20 caracteres.");
        }
    }

    // Valida campos de texto obligatorios.
    private void validarTexto(
            String valor, int maximo, String campo) {

        if (valor == null || valor.isBlank()
                || valor.trim().length() > maximo) {

            throw new IllegalArgumentException(
                    campo + " es obligatorio y admite máximo "
                            + maximo + " caracteres.");
        }
    }

    // Valida los datos del perfil del cliente.
    private void validar(Cliente cliente, boolean validarUsuario) {

        if (cliente == null) {
            throw new IllegalArgumentException(
                    "El cliente no puede ser nulo.");
        }

        if (validarUsuario && cliente.getIdUsuario() <= 0) {
            throw new IllegalArgumentException(
                    "El identificador del usuario no es válido.");
        }

        if (cliente.getGenero() != null
                && !GENEROS_VALIDOS.contains(cliente.getGenero())) {

            throw new IllegalArgumentException(
                    "El género debe ser MASCULINO, FEMENINO u OTRO.");
        }

        if (cliente.getPeso() != null
                && cliente.getPeso().signum() <= 0) {

            throw new IllegalArgumentException(
                    "El peso debe ser mayor que cero.");
        }

        if (cliente.getAltura() != null
                && cliente.getAltura().signum() <= 0) {

            throw new IllegalArgumentException(
                    "La altura debe ser mayor que cero.");
        }

        if (cliente.getObjetivo() != null
                && cliente.getObjetivo().length() > 150) {

            throw new IllegalArgumentException(
                    "El objetivo no puede superar los 150 caracteres.");
        }
    }

    // Valida identificadores.
    private void validarIdentificador(int id) {

        if (id <= 0) {
            throw new IllegalArgumentException(
                    "El identificador debe ser mayor que cero.");
        }
    }
}
