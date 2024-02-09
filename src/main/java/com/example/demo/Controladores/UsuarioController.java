package com.example.demo.Controladores;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelos.*;
import com.example.demo.Repositorio.*;


@RestController
public class UsuarioController {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @PostMapping(value = "/insertarUsuario", consumes = {"application/json"})
    public String insertarNuevoPedido(@RequestBody Usuario usuario){
        usuarioRepositorio.save(usuario);
        return "insertarUsuario";
    }

    @PostMapping(value = "/eliminarUsuario", consumes = {"application/json"})
    public String eliminarUsuario(@RequestBody Usuario usuario){
        usuarioRepositorio.eliminarUsuario(usuario);
        return "eliminarUsuario";
    }

    @GetMapping(value = "/comprobarUsuario", consumes = {"application/json"})
    public String comprobarUsuario(@RequestParam Usuario usuario ){
        usuarioRepositorio.getUsuarioPorNombre(usuario.getUsername());
        return "comprobarUsuario";
    }

}