package com.example.demo.Repositorio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


import com.example.demo.Modelos.Usuario;

@Repository
public class UsuarioRepositorio{
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UsuarioRepositorio(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    
    public List<Usuario> getTodosUsuario(){
        String query = "SELECT * FROM usuario;";
        List<Usuario> listaUsuarios = jdbcTemplate.query(query, new UsuarioRowMapper());
        return listaUsuarios;
    }
    
    public Usuario getUsuarioPorCod(int cod){
        String query = "SELECT * FROM usuario WHERE cod = ?";
        List<Usuario> listaUsuarios = jdbcTemplate.query(query, new UsuarioRowMapper(), cod);
        return (listaUsuarios.isEmpty())? null: listaUsuarios.get(0);
    }

    public List<Usuario> getUsuarioPorNombreYContrasena(String nombre, String pwd){
        String query = "SELECT * FROM usuario WHERE username like ? AND pwd like ?;";
        List<Usuario> listaUsuarios = jdbcTemplate.query(query, new UsuarioRowMapper(), nombre, pwd);
        return listaUsuarios;
    }

    public List<Usuario> getUsuarioPorNombre(String nombre){
        String query = "SELECT * FROM usuario WHERE username like ?;";
        List<Usuario> listaUsuarios = jdbcTemplate.query(query, new UsuarioRowMapper(), nombre);
        return listaUsuarios;
    }
}

