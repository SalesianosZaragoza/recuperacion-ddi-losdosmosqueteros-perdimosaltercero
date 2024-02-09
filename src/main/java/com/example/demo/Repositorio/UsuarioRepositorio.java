package com.example.demo.Repositorio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.Modelos.Usuario;

@Repository
public class UsuarioRepositorio{
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    
    public List<Usuario> getTodosUsuarios(){
        String query = "SELECT * FROM usuario;";
        List<Usuario> listaUsuarios = jdbcTemplate.query(query, new UsuarioRowMapper());
        System.out.println(listaUsuarios.toString());
        return listaUsuarios;
    }
    
    public Usuario getUsuarioPorCod(int cod){
        String query = "SELECT * FROM usuario WHERE cod = ?";
        List<Usuario> listaUsuarios = jdbcTemplate.query(query, new UsuarioRowMapper(), cod);
        return (listaUsuarios.isEmpty())? null: listaUsuarios.get(0);
    }

    public Usuario getUsuarioPorNombreYContrasena(String nombre, String pwd){
        String query = "SELECT * FROM usuario WHERE username like ? AND pwd like ?;";
        List<Usuario> listaUsuarios = jdbcTemplate.query(query, new UsuarioRowMapper(), nombre, pwd);
        System.out.println(listaUsuarios.get(0).getTipo_usuario());
        return listaUsuarios.get(0);
    }

    public Usuario getUsuarioPorNombre(String username){
        String query = "SELECT * FROM usuario WHERE username like ?;";
        List<Usuario> listaUsuarios = jdbcTemplate.query(query, new UsuarioRowMapper(), username);
        System.out.println(listaUsuarios.get(0).getTipo_usuario());
        return listaUsuarios.get(0);
    }

    public void save(Usuario usuario) {
        String query = "INSERT INTO usuario (username, pwd, tipousuario) VALUES (?, ?, ?);";
        jdbcTemplate.update(query, usuario.getUsername(), usuario.getPwd(), usuario.getTipo_usuario());
    }

    public void eliminarUsuario(Usuario usuario) {
        String query = "DELETE FROM usuario u WHERE u.cod = ?";
        jdbcTemplate.update(query, usuario.getCod());
    }
}

