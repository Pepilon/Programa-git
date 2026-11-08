
package com.powergym.servicio;

import com.powergym.dao.UsuarioDAO;
import com.powergym.modelo.Usuario;

import org.mindrot.jbcrypt.BCrypt;

import java.sql.SQLException;
import java.util.Locale;

public class AutenticacionServicio {

    private final UsuarioDAO usuarioDAO;

    public AutenticacionServicio() {
        this.usuarioDAO = new UsuarioDAO();
    }

    // Verifica las credenciales y permite el acceso al usuario.
    public Usuario iniciarSesion(String email, String password)
            throws SQLException {

        if (email == null || email.isBlank()
                || password == null || password.isBlank()) {
            return null;
        }

        // Normalizar el correo electrónico.
        String correoNormalizado = email.trim().toLowerCase(Locale.ROOT);

        // Buscar usuario por correo electrónico.
        Usuario usuario =
                usuarioDAO.buscarPorEmail(correoNormalizado);

        // Rechazar usuarios inexistentes o inactivos.
        if (usuario == null
                || !"ACTIVO".equals(usuario.getEstado())) {
            return null;
        }

        String passwordGuardada = usuario.getPassword();

        // Verificar que exista un hash almacenado.
        if (passwordGuardada == null
                || passwordGuardada.isBlank()) {
            return null;
        }

        try {

            // Comparar contraseña ingresada con el hash almacenado.
            boolean passwordCorrecta = BCrypt.checkpw(
                    password,
                    passwordGuardada
            );

            if (passwordCorrecta) {

                // No devolver información de la contraseña.
                usuario.setPassword(null);

                return usuario;
            }

        } catch (IllegalArgumentException e) {

            // Rechazar hashes inválidos.
            return null;
        }

        return null;
    }
}
