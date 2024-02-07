package com.example.demo.Repositorio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


import com.example.demo.Modelos.Pedido;

@Repository
public class PedidoRepositorio{
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    
    public List<Pedido> getTodosPedidos(){
        String query = "SELECT * FROM pedidos;";
        List<Pedido> listaPedidos = jdbcTemplate.query(query, new PedidoRowMapper());
        return listaPedidos;
    }
    
    public void save(Pedido pedido) {
        String query = "INSERT INTO pedidos (username, productos, producto_cantidad, total) VALUES (?, ?, ?, ?);";
        jdbcTemplate.update(query, pedido.getUsername(), pedido.getProductos(), pedido.getProducto_cantidad(), pedido.getTotal());
    }

        public void eliminarPedido(Pedido pedido){
        String query = "DELETE FROM pedidos p WHERE p.cod = ?";
        jdbcTemplate.update(query, pedido.getCod());
    }
}

