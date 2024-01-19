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

    List<Usuario> listaUsuarios = null;

    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody Usuario user) {
        // Validate the user's username and password here
        // If valid, return ResponseEntity.ok().build();
        System.out.println("USUARIO: "+ user.getUsername());
        listaUsuarios = usuarioRepositorio.getUsuarioPorNombre(user.getUsername());
        System.out.println(listaUsuarios);
        if(listaUsuarios.size() != 0){
            
                return ResponseEntity.ok().build();
            
        }
        else {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        
        }

    }

    @GetMapping("/usuarios")
    public List<Usuario> getTodosProductos(){
        System.out.println(usuarioRepositorio.getTodosUsuario());
        return usuarioRepositorio.getTodosUsuario();
    }
}