package com.example.demo.Repositorio;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

import com.example.demo.Modelos.Pedido;

public class PedidoRowMapper implements RowMapper<Pedido> {

    @Override
    public Pedido mapRow(ResultSet rs, int rowNum) throws SQLException {
        Pedido pedido = new Pedido();
        pedido.setCod(rs.getInt("cod"));
        pedido.setUsername(rs.getString("username"));
        pedido.setProductos(new Object[]{rs.getString("productos")});
        pedido.setTotal(rs.getInt("total"));
        return pedido;
    }
}