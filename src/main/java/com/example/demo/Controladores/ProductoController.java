package com.example.demo.Controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelos.*;
import com.example.demo.Repositorio.*;


@Controller
@RestController
public class ProductoController {
    
    @Autowired
    private ProductoRepositorio productoRepositorio;

    @RequestMapping("/listaProductos")
    public String listadoProductos(Model model){
        List<Producto> listaProductos = productoRepositorio.getTodosProductos();
        model.addAttribute("listaProductos", listaProductos);
        return "listaProductos";
    }

    @RequestMapping("/formModificarProducto/{cod}")
    public String formModificadoProducto(@PathVariable int cod, Model model){
        Producto producto = productoRepositorio.getProductoPorCod(cod);
        if (producto != null) {
            model.addAttribute("producto", producto);
            return "formModificarProducto";
        }
        else{
            return "paginaError";
        }   
    }

    @RequestMapping("/formInsertarProducto")
    public String formInsertadoProducto(Model model){
        Producto producto = new Producto();
        model.addAttribute("producto", producto);
        return "formProducto";
    }

    @RequestMapping("/insertarProducto")
    public String insertarNuevoProducto(Producto producto, Model model){
        System.out.println(producto.getCod() + ", " + producto.getNombre());
        productoRepositorio.crearProducto(producto);
        return listadoProductos(model);
    }

    @RequestMapping("/actualizarProducto")
    public String actualizarProducto(Producto producto, Model model){
        System.out.println(producto.getCod() + ", " + producto.getNombre());
        productoRepositorio.actualizarProducto(producto);
        return listadoProductos(model);
    }

    @RequestMapping("/avisoEliminarProducto/{cod}")
    public String avisoEliminarProducto(@PathVariable int cod, Model model){
        Producto producto = productoRepositorio.getProductoPorCod(cod);
        if (producto != null) {
            model.addAttribute("producto", producto);
            return "avisoEliminarProducto";
        }
        else{
            return "paginaError";
        }   
    }

    @RequestMapping("/eliminarProducto/{cod}")
    public String eliminarProducto(@PathVariable int cod, Model model){
        Producto producto = productoRepositorio.getProductoPorCod(cod);
        if (producto != null) {
            productoRepositorio.eliminarProducto(producto);
            return listadoProductos(model);
        }
        else{
            return "paginaError";
        }   
    }

    
    
    @GetMapping("/productos")
    public List<Producto> getTodosProductos(){
        return productoRepositorio.getTodosProductos();
    }

    @GetMapping("/productos/{cod}")
    public Producto getProductoPorCod(int cod){
        return productoRepositorio.getProductoPorCod(cod);
    }

    public Producto quitarUnoDeCantidad(Producto producto) {
        productoRepositorio.restarCantidad(producto);
        return productoRepositorio.getProductoPorCod(producto.getCod());
    }

    public Producto agregarUnoDeCantidad(Producto producto) {
        productoRepositorio.sumarCantidad(producto);
        return productoRepositorio.getProductoPorCod(producto.getCod());
    }

    @PostMapping(value = "/insertarProducto", consumes = {"application/json"})
    public String insertarNuevoProducto(@RequestBody Producto producto){
        productoRepositorio.save(producto);
        return "insertarProducto";
    }

    @PostMapping(value = "/cambiarProducto", consumes = {"application/json"})
    public String cambiarProducto(@RequestBody Producto producto){
        productoRepositorio.actualizarProducto(producto);
        return "cambiarProducto";
    }

    @PostMapping(value = "/eliminarProducto", consumes = {"application/json"})
    public String eliminarProducto(@RequestBody Producto producto){
        productoRepositorio.eliminarProducto(producto);
        return "eliminarProducto";
    }

}
