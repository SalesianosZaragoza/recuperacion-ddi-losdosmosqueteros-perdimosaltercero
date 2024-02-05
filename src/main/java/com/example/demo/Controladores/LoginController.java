package com.example.demo.Controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelos.*;
import com.example.demo.Repositorio.*;


@RestController
public class LoginController {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    Usuario listaUsuarios = null;

    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody Usuario user) {
        // Validate the user's username and password here
        // If valid, return ResponseEntity.ok().build();
        
        listaUsuarios = usuarioRepositorio.getUsuarioPorNombreYContrasena(user.getUsername(), user.getPwd());
        System.out.println("USUARIO: " + user.getUsername() +  " Tipo usuario: " + listaUsuarios.getTipo_usuario() +  " Contraseña: " + listaUsuarios.getPwd());

        if(listaUsuarios != null){
            
                return ResponseEntity.ok().build();
            
        }
        else {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        
        }

    }

    @GetMapping("/usuarios")
    public List<Usuario> getTodosUsuarios(){
        System.out.println(usuarioRepositorio.getTodosUsuarios());
        System.out.println(listaUsuarios + "AAAAAAAAAAAAAAAAAAAAAAA");
        return usuarioRepositorio.getTodosUsuarios();
    }
}