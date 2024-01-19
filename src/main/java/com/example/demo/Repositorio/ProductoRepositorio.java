package com.example.demo.Repositorio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.Modelos.Producto;

@Repository
public class ProductoRepositorio {
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    
    public List<Producto> getTodosProductos(){
        String query = "SELECT * FROM producto;";
        List<Producto> listaProductos = jdbcTemplate.query(query, new ProductoRowMapper());
        return listaProductos;
    }
    
    public Producto getProductoPorCod(int cod){
        String query = "SELECT * FROM producto WHERE cod = ?";
        List<Producto> listaProductos = jdbcTemplate.query(query, new ProductoRowMapper(), cod);
        return (listaProductos.isEmpty())? null: listaProductos.get(0);
    }

    public void eliminarProducto(Producto producto){
        String query = "DELETE FROM producto p WHERE p.cod = ?";
        jdbcTemplate.update(query, producto.getCod());
    }

    public void actualizarProducto(Producto producto){
        String query = "UPDATE producto SET nombre = ?, cantidad = ? WHERE cod = ?";
        jdbcTemplate.update(query, producto.getNombre(), producto.getCantidad(), producto.getCod());
    }

    public void crearProducto(Producto producto){
        String query = "INSERT INTO producto (cod, nombre) VALUES (?, ?)";
        jdbcTemplate.update(query, producto.getCod(), producto.getNombre());
    }

    public void restarCantidad(Producto producto){
        String query = "UPDATE producto SET cantidad = cantidad - 1 WHERE cod = ?";
        jdbcTemplate.update(query, producto.getCod());
    }

    public void sumarCantidad(Producto producto){
        String query = "UPDATE producto SET cantidad = cantidad + 1 WHERE cod = ?";
        jdbcTemplate.update(query, producto.getCod());
    }
}
