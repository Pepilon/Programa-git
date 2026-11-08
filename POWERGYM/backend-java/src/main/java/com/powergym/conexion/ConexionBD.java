package com.powergym.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionBD {

    private static final String URL = System.getenv("POWERGYM_DB_URL");
    private static final String USUARIO = System.getenv("POWERGYM_DB_USER");
    private static final String PASSWORD = System.getenv("POWERGYM_DB_PASSWORD");

    private ConexionBD() {
    }

    public static Connection obtenerConexion() throws SQLException {

        if (URL == null || USUARIO == null || PASSWORD == null) {
            throw new SQLException(
                "Faltan variables de entorno para conectar con MySQL."
            );
        }

        return DriverManager.getConnection(URL, USUARIO, PASSWORD);
    }
}
