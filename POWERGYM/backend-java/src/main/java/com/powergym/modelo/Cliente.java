package com.powergym.modelo;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Cliente {

    private int idCliente;
    private int idUsuario;
    private LocalDate fechaNacimiento;
    private String genero;
    private BigDecimal peso;
    private BigDecimal altura;
    private String objetivo;

    public Cliente() {
    }

    public Cliente(int idUsuario, LocalDate fechaNacimiento,
                   String genero, BigDecimal peso,
                   BigDecimal altura, String objetivo) {
        this.idUsuario = idUsuario;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.peso = peso;
        this.altura = altura;
        this.objetivo = objetivo;
    }

    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public BigDecimal getPeso() {
        return peso;
    }

    public void setPeso(BigDecimal peso) {
        this.peso = peso;
    }

    public BigDecimal getAltura() {
        return altura;
    }

    public void setAltura(BigDecimal altura) {
        this.altura = altura;
    }

    public String getObjetivo() {
        return objetivo;
    }

    public void setObjetivo(String objetivo) {
        this.objetivo = objetivo;
    }
}