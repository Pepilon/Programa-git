
package com.powergym.dao;

import com.powergym.conexion.ConexionBD;
import com.powergym.modelo.Cliente;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ClienteDAO {

    // Inserta un cliente utilizando una conexión propia.
    public boolean insertar(Cliente cliente) throws SQLException {

        try (Connection conexion = ConexionBD.obtenerConexion()) {
            return insertar(conexion, cliente);
        }
    }

    // Inserta un cliente utilizando una conexión existente.
    public boolean insertar(Connection conexion, Cliente cliente)
            throws SQLException {

        String sql = """
            INSERT INTO clientes
            (id_usuario, fecha_nacimiento, genero, peso, altura, objetivo)
            VALUES (?, ?, ?, ?, ?, ?)
            """;

        try (PreparedStatement consulta = conexion.prepareStatement(
                sql, Statement.RETURN_GENERATED_KEYS)) {

            consulta.setInt(1, cliente.getIdUsuario());

            consulta.setDate(2, cliente.getFechaNacimiento() == null
                    ? null
                    : Date.valueOf(cliente.getFechaNacimiento()));

            consulta.setString(3, cliente.getGenero());
            consulta.setBigDecimal(4, cliente.getPeso());
            consulta.setBigDecimal(5, cliente.getAltura());
            consulta.setString(6, cliente.getObjetivo());

            int filas = consulta.executeUpdate();

            if (filas == 0) {
                return false;
            }

            try (ResultSet claves = consulta.getGeneratedKeys()) {

                if (claves.next()) {
                    cliente.setIdCliente(claves.getInt(1));
                } else {
                    throw new SQLException(
                            "No se pudo recuperar el ID del cliente.");
                }
            }

            return true;
        }
    }

    // Busca un cliente por su identificador.
    public Cliente buscarPorId(int idCliente) throws SQLException {

        String sql = """
            SELECT *
            FROM clientes
            WHERE id_cliente = ?
            """;

        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement consulta = conexion.prepareStatement(sql)) {

            consulta.setInt(1, idCliente);

            try (ResultSet resultado = consulta.executeQuery()) {

                if (resultado.next()) {
                    return mapearCliente(resultado);
                }
            }
        }

        return null;
    }

    // Busca un cliente por el documento de su usuario.
    public Cliente buscarPorDocumento(String documento)
            throws SQLException {

        String sql = """
            SELECT c.*
            FROM clientes c
            INNER JOIN usuarios u
                ON c.id_usuario = u.id_usuario
            WHERE u.documento = ?
            """;

        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement consulta = conexion.prepareStatement(sql)) {

            consulta.setString(1, documento.trim());

            try (ResultSet resultado = consulta.executeQuery()) {

                if (resultado.next()) {
                    return mapearCliente(resultado);
                }
            }
        }

        return null;
    }

 // Consulta únicamente los clientes que tienen un usuario activo.
public List<Cliente> listarTodos() throws SQLException {

    String sql = """
        SELECT c.*
        FROM clientes c
        INNER JOIN usuarios u
            ON c.id_usuario = u.id_usuario
        WHERE u.estado = 'ACTIVO'
        ORDER BY c.id_cliente
        """;

    List<Cliente> clientes = new ArrayList<>();

    try (Connection conexion = ConexionBD.obtenerConexion();
         PreparedStatement consulta = conexion.prepareStatement(sql);
         ResultSet resultado = consulta.executeQuery()) {

        while (resultado.next()) {
            clientes.add(mapearCliente(resultado));
        }
    }

    return clientes;
}

    // Actualiza la información de un cliente.
    public boolean actualizar(Cliente cliente) throws SQLException {

        String sql = """
            UPDATE clientes
            SET fecha_nacimiento = ?,
                genero = ?,
                peso = ?,
                altura = ?,
                objetivo = ?
            WHERE id_cliente = ?
            """;

        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement consulta = conexion.prepareStatement(sql)) {

            consulta.setDate(1, cliente.getFechaNacimiento() == null
                    ? null
                    : Date.valueOf(cliente.getFechaNacimiento()));

            consulta.setString(2, cliente.getGenero());
            consulta.setBigDecimal(3, cliente.getPeso());
            consulta.setBigDecimal(4, cliente.getAltura());
            consulta.setString(5, cliente.getObjetivo());
            consulta.setInt(6, cliente.getIdCliente());

            return consulta.executeUpdate() > 0;
        }
    }

    // Convierte un registro de MySQL en un objeto Cliente.
    private Cliente mapearCliente(ResultSet resultado)
            throws SQLException {

        Cliente cliente = new Cliente();

        cliente.setIdCliente(resultado.getInt("id_cliente"));
        cliente.setIdUsuario(resultado.getInt("id_usuario"));

        Date fecha = resultado.getDate("fecha_nacimiento");

        cliente.setFechaNacimiento(
                fecha == null ? null : fecha.toLocalDate());

        cliente.setGenero(resultado.getString("genero"));
        cliente.setPeso(resultado.getBigDecimal("peso"));
        cliente.setAltura(resultado.getBigDecimal("altura"));
        cliente.setObjetivo(resultado.getString("objetivo"));

        return cliente;
    }
}
