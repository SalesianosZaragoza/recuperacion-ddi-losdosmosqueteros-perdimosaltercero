package com.example.demo.Repositorio;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

import com.example.demo.Modelos.Producto;

public class ProductoRowMapper implements RowMapper<Producto> {

    @Override
    public Producto mapRow(@SuppressWarnings("null")ResultSet rs, int rowNum) throws SQLException {
        Producto producto = new Producto();
        producto.setCod(rs.getInt("cod"));
        producto.setNombre(rs.getString("nombre"));
        producto.setPrecio(rs.getDouble("precio"));
        producto.setCantidad(rs.getInt("cantidad"));
        producto.setCategoria(rs.getInt("categoria"));
        producto.setDescripcion(rs.getString("descripcion"));
        producto.setFoto(rs.getString("foto"));
        return producto;
    }
}