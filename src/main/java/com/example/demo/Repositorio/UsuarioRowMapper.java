package com.example.demo.Repositorio;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

import com.example.demo.Modelos.Usuario;

public class UsuarioRowMapper implements RowMapper<Usuario> {

    @Override
    public Usuario mapRow(@SuppressWarnings("null")ResultSet rs, int rowNum) throws SQLException {
        Usuario usuario = new Usuario();
        usuario.setCod(rs.getInt("cod"));
        usuario.setUsername(rs.getString("username"));
        usuario.setPwd(rs.getString("pwd"));
        usuario.setTipo_usuario(rs.getInt("tipousuario"));
        return usuario;
    }
}