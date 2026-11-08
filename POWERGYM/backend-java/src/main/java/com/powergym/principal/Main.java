
package com.powergym.principal;

import com.powergym.modelo.Cliente;
import com.powergym.servicio.ClienteServicio;
import com.mysql.cj.jdbc.AbandonedConnectionCleanupThread;

import java.util.List;

public class Main {

    public static void main(String[] args) {

        ClienteServicio clienteServicio = new ClienteServicio();

        try {

            System.out.println("================================");
            System.out.println("       SISTEMA POWER GYM");
            System.out.println("================================");

            List<Cliente> clientes = clienteServicio.listar();

            System.out.println("Conexión y consulta realizadas correctamente.");
            System.out.println("Total de clientes registrados: " + clientes.size());

            for (Cliente cliente : clientes) {
                System.out.println(
                        "ID cliente: " + cliente.getIdCliente()
                        + " | ID usuario: " + cliente.getIdUsuario()
                );
            }

        } catch (Exception e) {

            System.err.println(
                    "No fue posible ejecutar el módulo: " + e.getMessage()
            );

        } finally {

            AbandonedConnectionCleanupThread.checkedShutdown();
        }
    }
}
