import { useState, useEffect } from 'react';
import React from 'react';

function Admin() {
const [productos, setProductos] = useState([]);
const [usuarios, setUsuarios] = useState([]);

useEffect(() => {
    fetch('/productos')
      .then(response => response.json())
      .then(data => {
        // Add a quantity property to each product
        const productosConCantidad = data.map(producto => ({ ...producto, cantidad: 0 }));
        setProductos(productosConCantidad);
      });
  }, []);

  useEffect(() => {
    fetch('/usuarios')
      .then(response => response.json())
      .then(data => { 
        setUsuarios(data);
      });
  }, []);

return (
    <div>
      {usuarios.map(usuario => (
      <p key={usuario.cod}>{usuario.username}</p>
        ))}
        <h1>Crear productos</h1>
        <input type="text" 
          name="nuevoNombre"
          id="nuevoNombre" 
          placeholder='Nombre del producto'
          />
        <input type="text" 
          name="nuevoPrecio"
          id="nuevoPrecio" 
          placeholder='Precio del producto'
          />
        <input type="number" 
          name="nuevaCantidad"
          id="nuevaCantidad" 
          placeholder='Cantidad del producto'
          />

        <input type="text" 
          name="nuevaDescripcion"
          id="nuevaDescripcion" 
          placeholder='Descripción del producto'
          />

        <input type="text" 
          name="nuevaFoto"
          id="nuevaFoto" 
          placeholder='Foto del producto (URL)'
          />
        <hr />
        <h1>Modificar productos</h1>

            <select name="productos" id="productos">
            {productos.map(product => (
                <React.Fragment key={product.cod}>
                    <option value={product.cod}>{product.nombre}</option>
                </React.Fragment>
            ))}
            </select>
                    <input type="text" 
                    name="nuevoNombre"
                    id="nuevoNombre" 
                    placeholder='Nombre del producto'
                    />
                    <input type="text" 
                    name="nuevoPrecio"
                    id="nuevoPrecio" 
                    placeholder='Precio del producto'
                    />
                    <input type="number" 
                    name="nuevaCantidad"
                    id="nuevaCantidad" 
                    placeholder='Cantidad del producto'
                    />

                    <input type="text" 
                    name="nuevaDescripcion"
                    id="nuevaDescripcion" 
                    placeholder='Descripción del producto'
                    />

                    <input type="text" 
                    name="nuevaFoto"
                    id="nuevaFoto" 
                    placeholder='Foto del producto (URL)'
                    />
        <hr />
        <h1>Repostar mercancía</h1>
        <select name="productos" id="productos">
            {productos.map(product => (
                <React.Fragment key={product.cod}>
                    <option value={product.cod}>{product.nombre}</option>
                </React.Fragment>
            ))}
            </select>
            <input type="number" 
                    name="nuevaCantidad"
                    id="nuevaCantidad" 
                    placeholder='Cantidad del producto'
                    />
        <hr />
        <h1>Lista de pedidos</h1>
      

        
    </div>
  );
}

export default Admin;