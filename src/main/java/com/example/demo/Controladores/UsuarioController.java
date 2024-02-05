package com.example.demo.Controladores;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    

}