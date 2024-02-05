package com.example.demo.Controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.Modelos.*;
import com.example.demo.Repositorio.*;

@RestController
public class PedidoController {
    
    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    @RequestMapping("/listaPedidos")
    public String listadoPedidos(Model model){
        List<Pedido> listaPedidos = pedidoRepositorio.getTodosPedidos();
        model.addAttribute("listaPedidos", listaPedidos);
        return "listaPedidos";
    }


    @PostMapping(value = "/insertarPedido", consumes = {"application/json"})
    public String insertarNuevoPedido(@RequestBody Pedido pedido){
        pedidoRepositorio.save(pedido);
        return "insertarPedido";
    }
    
    @PostMapping(value = "/eliminarPedido", consumes = {"application/json"})
    public String eliminarPedido(@RequestBody Pedido pedido){
        pedidoRepositorio.eliminarPedido(pedido);
        return "eliminarPedido";
    }
    
    @GetMapping("/pedidos")
    public List<Pedido> getTodosPedidos(){
        return pedidoRepositorio.getTodosPedidos();
    }

}
