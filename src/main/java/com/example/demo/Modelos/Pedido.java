package com.example.demo.Modelos;

public class Pedido {
    private int cod;
    private String username;
    private Object[] productos;
    private Object[] producto_cantidad;
    private double total;



    

    /**
     * @return String return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
    }




    /**
     * @return double return the total
     */
    public double getTotal() {
        return total;
    }

    /**
     * @param total the total to set
     */
    public void setTotal(double total) {
        this.total = total;
    }


    /**
     * @return Object[] return the productos
     */
    public Object[] getProductos() {
        return productos;
    }

    /**
     * @param productos the productos to set
     */
    public void setProductos(Object[] productos) {
        this.productos = productos;
    }

    

    /**
     * @return int return the cod
     */
    public int getCod() {
        return cod;
    }

    /**
     * @param cod the cod to set
     */
    public void setCod(int cod) {
        this.cod = cod;
    }





    /**
     * @return Object[] return the producto_cantidad
     */
    public Object[] getProducto_cantidad() {
        return producto_cantidad;
    }

    /**
     * @param producto_cantidad the producto_cantidad to set
     */
    public void setProducto_cantidad(Object[] producto_cantidad) {
        this.producto_cantidad = producto_cantidad;
    }

}
