
package com.powergym.dao;

import com.powergym.conexion.ConexionBD;
import com.powergym.modelo.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class UsuarioDAO {

    // Registra un usuario y recupera su identificador.
    public void insertar(Connection conexion, Usuario usuario)
            throws SQLException {

        String sql = """
            INSERT INTO usuarios
            (nombre, apellido, documento, email,
             telefono, password, rol, estado)
            VALUES (?, ?, ?, ?, ?, ?, 'CLIENTE', 'ACTIVO')
            """;

        try (PreparedStatement consulta = conexion.prepareStatement(
                sql, Statement.RETURN_GENERATED_KEYS)) {

            consulta.setString(1, usuario.getNombre());
            consulta.setString(2, usuario.getApellido());
            consulta.setString(3, usuario.getDocumento());
            consulta.setString(4, usuario.getEmail());
            consulta.setString(5, usuario.getTelefono());
            consulta.setString(6, usuario.getPassword());

            consulta.executeUpdate();

            try (ResultSet claves = consulta.getGeneratedKeys()) {

                if (claves.next()) {
                    usuario.setIdUsuario(claves.getInt(1));
                } else {
                    throw new SQLException(
                            "No se pudo recuperar el ID del usuario.");
                }
            }
        }
    }

    // Busca un usuario por su correo electrónico.
    public Usuario buscarPorEmail(String email) throws SQLException {

        String sql = """
            SELECT id_usuario, nombre, apellido, documento,
                   email, telefono, password, rol, estado
            FROM usuarios
            WHERE email = ?
            """;

        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement consulta = conexion.prepareStatement(sql)) {

            consulta.setString(1, email);

            try (ResultSet resultado = consulta.executeQuery()) {

                if (resultado.next()) {
                    return mapearUsuario(resultado);
                }
            }
        }

        return null;
    }

    // Busca un usuario por su identificador.
    public Usuario buscarPorId(int idUsuario) throws SQLException {

        String sql = """
            SELECT id_usuario, nombre, apellido, documento,
                   email, telefono, password, rol, estado
            FROM usuarios
            WHERE id_usuario = ?
            """;

        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement consulta = conexion.prepareStatement(sql)) {

            consulta.setInt(1, idUsuario);

            try (ResultSet resultado = consulta.executeQuery()) {

                if (resultado.next()) {
                    return mapearUsuario(resultado);
                }
            }
        }

        return null;
    }

    // Desactiva un usuario sin eliminar sus registros.
    public boolean desactivar(int idUsuario) throws SQLException {

        String sql = """
            UPDATE usuarios
            SET estado = 'INACTIVO'
            WHERE id_usuario = ?
              AND estado = 'ACTIVO'
            """;

        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement consulta = conexion.prepareStatement(sql)) {

            consulta.setInt(1, idUsuario);

            return consulta.executeUpdate() > 0;
        }
    }
// Reactiva un usuario previamente desactivado.
public boolean activar(int idUsuario) throws SQLException {

    String sql = """
        UPDATE usuarios
        SET estado = 'ACTIVO'
        WHERE id_usuario = ?
          AND estado = 'INACTIVO'
        """;

    try (Connection conexion = ConexionBD.obtenerConexion();
         PreparedStatement consulta = conexion.prepareStatement(sql)) {

        consulta.setInt(1, idUsuario);

        return consulta.executeUpdate() > 0;
    }
}
    // Convierte un registro de MySQL en un objeto Usuario.
    private Usuario mapearUsuario(ResultSet resultado)
            throws SQLException {

        Usuario usuario = new Usuario();

        usuario.setIdUsuario(resultado.getInt("id_usuario"));
        usuario.setNombre(resultado.getString("nombre"));
        usuario.setApellido(resultado.getString("apellido"));
        usuario.setDocumento(resultado.getString("documento"));
        usuario.setEmail(resultado.getString("email"));
        usuario.setTelefono(resultado.getString("telefono"));
        usuario.setPassword(resultado.getString("password"));
        usuario.setRol(resultado.getString("rol"));
        usuario.setEstado(resultado.getString("estado"));

        return usuario;
    }
}
