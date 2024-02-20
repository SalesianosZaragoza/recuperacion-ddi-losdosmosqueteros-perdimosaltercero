import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';

function Admin() {
const [productos, setProductos] = useState([]);
const [pedidos, setPedidos] = useState([]);
const [usuarios, setUsuarios] = useState([]);
const [nuevoNombre, setNuevoNombre] = useState('');
const [nuevoPrecio, setNuevoPrecio] = useState('');
const [nuevaCantidad, setNuevaCantidad] = useState('');
const [nuevaCategoria, setNuevaCategoria] = useState('');
const [nuevaDescripcion, setNuevaDescripcion] = useState('');
const [nuevaFoto, setNuevaFoto] = useState('');
const [modNombre, setModNombre] = useState('');	
const [modPrecio, setModPrecio] = useState('');
const [modCantidad, setModCantidad] = useState('');
const [modCategoria, setModCategoria] = useState('');
const [modDescripcion, setModDescripcion] = useState('');
const [modFoto, setModFoto] = useState('');
const [selectedProduct, setSelectedProduct] = useState('');
const [selectedProduct2, setSelectedProduct2] = useState('');
const [selectedPedido2, setSelectedPedido2] = useState('');

// Mapping of categoria to titles
const tiposUsuario = {
  1: 'Administrador',
  2: 'Usuario normal'
};

// Mapping of categoria to titles
const categoriaTitles = {
  1: 'Bocadillos',
  2: 'Cafe',
  3: 'Bolleria',
  4: 'Snacks',
  5: 'Bebidas',
  6: 'Otros',
};

const handleSelectChange = (event) => {
  const selectedProductCod = Number(event.target.value);
  setSelectedProduct(selectedProductCod);
  console.log(selectedProductCod);
  const selectedProduct = productos.find((producto) => producto.cod === selectedProductCod);
  console.log(selectedProduct);
  if (selectedProduct) {
    setModNombre(selectedProduct.nombre);
    setModPrecio(selectedProduct.precio);
    setModCantidad(selectedProduct.cantidad);
    setModCategoria(selectedProduct.categoria);
    setModDescripcion(selectedProduct.descripcion);
    setModFoto(selectedProduct.foto);
  }
};

// Ordenar usuarios por tipos
const sortedUsuarios = [...usuarios].sort((a, b) => a.tipo_usuario - b.tipo_usuario);

const handleSelectChange2 = (event) => {
  setSelectedProduct2(event.target.value);
};



const handleSelectChange4 = (event) => {
  setSelectedPedido2(event.target.value);
};

useEffect(() => {
  document.documentElement.style.backgroundColor = '#25283D';
  return () => {
    document.documentElement.style.backgroundColor = null;
  };
}, []);

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
    fetch('/pedidos')
      .then(response => response.json())
      .then(data => {
        const pedidos3 = data.map(pedido => ({ ...pedido}));
        setPedidos(pedidos3);
      });
  }, []);

  useEffect(() => {
    fetch('/usuarios')
      .then(response => response.json())
      .then(data => {
        const usuarios = data.map(usuario => ({ ...usuario}));
        setUsuarios(usuarios);
      });
  }, []);

  const handleNuevoProducto = event => {
    event.preventDefault();
    
    const productoNuevo = {
      nombre: nuevoNombre,
      precio: nuevoPrecio,
      cantidad: nuevaCantidad,
      categoria: nuevaCategoria,
      descripcion: nuevaDescripcion,
      foto: nuevaFoto
    };
    
    // Send POST request to /insertarProducto
    fetch('./insertarProducto', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoNuevo),
    })
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.text();
    })
    .then(data => {
        console.log('Product created', data);
        alert("Producto creado correctamente");
      // Redirect to LoginPage

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    };

    const handleCambioProducto = event => {
      event.preventDefault();
      
      const productoCambiado = {
        nombre: modNombre,
        precio: modPrecio,
        cantidad: modCantidad,
        categoria: modCategoria,
        descripcion: modDescripcion,
        foto: modFoto,
        cod: selectedProduct
      };
      
      // Send POST request to /cambiarProducto
      fetch('./cambiarProducto', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(productoCambiado),
      })
      .then(response => {
          if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          return response.text();
      })
      .then(data => {
          console.log('Product modified', data);
          alert("Producto modificado correctamente");
        // Redirect to LoginPage
  
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
      };

      const handleEliminarProducto = event => {
        event.preventDefault();
        
        const productoEliminado = {

          cod: selectedProduct2
        };
        
        // Send POST request to /eliminarProducto
        fetch('./eliminarProducto', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(productoEliminado),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return response.text();
        })
        .then(data => {
            console.log('Product deleted', data);
            alert("Producto borrado correctamente.");
    
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        };

        const handleEliminarPedido = event => {
          event.preventDefault();
          
          const pedidoEliminado = {
  
            cod: selectedPedido2
          };
          
          // Send POST request to /eliminarPedido
          fetch('./eliminarPedido', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify(pedidoEliminado),
          })
          .then(response => {
              if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
              }
              
              return response.text();
          })
          .then(data => {
              console.log('Pedido deleted', data);
              alert("Pedido borrado correctamente.");
      
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
          });
          };

        const deleteUser = event => {
            event.preventDefault();
          
            const userToDelete = {
              cod: event.target.value
            };
          
            // Send POST request to /deleteUser
            fetch('./eliminarUsuario', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userToDelete),
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
          
              return response.text();
            })
            .then(data => {
              console.log('User deleted', data);
              alert("Usuario borrado correctamente.");
            })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });
          };


return (
    <div className="Admin" style={{backgroundColor: '#25283D'}}>
      <div style={{marginLeft: '20px'}}>
        <h1>Crear productos</h1>
        <form onSubmit={handleNuevoProducto}>
        <label>Nombre del producto:</label>
        <br/>
        <input type="text" 
          name="nuevoNombre"
          id="nuevoNombre" 
          placeholder='Nombre del producto'
          onChange={e => setNuevoNombre(e.target.value)}
          maxLength={20}
          required
          />
          <br/>
          <br/>
        <label>Precio del producto:</label>
        <br/>
          <input type="number" 
            name="nuevoPrecio"
            id="nuevoPrecio" 
            placeholder='Precio del producto'
            min="0.01"
            step="0.01"
            max="999"
            onKeyPress={event => {
              const inputValue = event.target.value;
              if (
                (event.key === '-') || 
                (event.key === '+') || 
                (event.key === 'e') || 
                (event.key=== 'E') || 
                (event.key === '.' && inputValue.includes('.'))
              ) event.preventDefault();
            }}
            onChange={event => {
              const newValue = parseFloat(event.target.value);
              if (newValue > 0) {
                setNuevoPrecio(newValue);
              }
            }}
          />
          <br/>
          <br/>
        <label>Cantidad del producto:</label>
        <br/>
        <input type="number" 
          name="nuevaCantidad"
          id="nuevaCantidad" 
          placeholder='Cantidad del producto'
          min="0"
          max="99999"
          onKeyPress={event => {
            if ((event.key === '-') || (event.key === '+') || (event.key === 'e') || (event.key=== 'E')) event.preventDefault();
          }}
          onChange={event => {
            const newValue = event.target.value;
            if (newValue >= 0) {
              setNuevaCantidad(newValue);
            }
          }}
          />
          <br/>
          <br/>
          <label>Categoría del producto:</label>
          <br/>
          <select name="nuevaCategoria" id="nuevaCategoria" value={nuevaCategoria} onChange={e => setNuevaCategoria(e.target.value)}>
                  <option value="0" disabled>Selecciona una categoría</option>
                    <option value="1">Bocadillos</option>
                    <option value="2">Café</option>
                    <option value="3">Bollería</option>
                    <option value="4">Aperitivos</option>
                    <option value="5">Bebidas</option>
                    <option value="6">Otros</option>


            
            </select>
          <br/>
          <br/>
        <label>Descripción del producto:</label>
        <br/>
        <input type="text" 
          name="nuevaDescripcion"
          id="nuevaDescripcion" 
          placeholder='Descripción del producto'
          onChange={e => setNuevaDescripcion(e.target.value)}
          maxLength={20}
          required
          />
          <br/>
          <br/>
        <label>Foto del producto:</label>
        <br/>
        <input type="text" 
          name="nuevaFoto"
          id="nuevaFoto" 
          placeholder='Foto del producto (URL)'
          onChange={e => setNuevaFoto(e.target.value)}
          maxLength={50}
          />
          <br/>
          <br/>
          <button type="submit" class="btn btn-success">Crear producto</button>
          </form>
        <hr />
        <h1>Modificar producto</h1>
        <br/>
        <label>Selecciona un producto:</label>
        <br/>
          <form onSubmit={handleCambioProducto}>
            <select name="productos1" id="productos1" value={selectedProduct} onChange={handleSelectChange}>
            <option value="0" disabled>Selecciona un producto</option>
            {productos.map(product => (
                <React.Fragment key={product.cod}>
                    <option value={product.cod}>{product.nombre}</option>
                </React.Fragment>
            ))}
            
            </select>
            <br/>
            <br/>
            <label>Nombre del producto:</label>
                    <br/>
                    <input type="text" 
                    name="modNombre"
                    id="modNombre" 
                    placeholder='Nombre del producto'
                    value={modNombre}
                    onChange={e => setModNombre(e.target.value)}
                    maxLength={20}
                    required
                    />
                    <br/>
                    <br/>
                    <label>Precio del producto:</label>
                    <br/>
                    <input type="number" 
                      name="modPrecio"
                      id="modPrecio" 
                      placeholder='Precio del producto'
                      min="0.01"
                      step="0.01"
                      max="999"
                      value={modPrecio}
                      onKeyPress={event => {
                        const inputValue = event.target.value;
                        
                        if (
                          (event.key === '-') || 
                          (event.key === '+') || 
                          (event.key === 'e') || 
                          (event.key=== 'E') || 
                          (event.key === '.' && inputValue.includes('.'))
                        ) event.preventDefault();
                      }}
                      onChange={event => {
                        const newValue = parseFloat(event.target.value);
                        console.log(newValue);
                        if (newValue > 0) {
                          setModPrecio(newValue);
                        }
                      }}
                    />
                    <br/>
                    <br/>
                    <label>Cantidad del producto:</label>
                    <br/>
                    <input type="number" 
                    name="modCantidad"
                    id="modCantidad" 
                    placeholder='Cantidad del producto'
                    required
                    value={modCantidad}
                    min="0"
                    max="99999"
                    onKeyPress={event => {
                      if ((event.key === '-') || (event.key === '+') || (event.key === 'e') || (event.key=== 'E')) event.preventDefault();
                    }}
                    onChange={event => {
                      const newValue = event.target.value;
                      if (newValue >= 0) {
                        setModCantidad(newValue);
                      }
                    }}
                    />
                    <br/>
                    <br/>
                    <label>Categoría del producto:</label>
                    <br/>
                    <select name="modCategoria" id="modCategoria" value={modCategoria} onChange={e => setModCategoria(e.target.value)}>
                      <option value="0" disabled>Selecciona una categoría</option>
                      <option value="1">Bocadillos</option>
                      <option value="2">Café</option>
                      <option value="3">Bollería</option>
                      <option value="4">Aperitivos</option>
                      <option value="5">Bebidas</option>
                      <option value="6">Otros</option>
                    </select>
                    <br/>
                    <br/>
                    <label>Descripción del producto:</label>
                    <br/>
                    <input type="text" 
                    name="modDescripcion"
                    id="modDescripcion" 
                    placeholder='Descripción del producto'
                    required
                    value={modDescripcion}
                    onChange={e => setModDescripcion(e.target.value)}
                    maxLength={20}
                    />
                    <br/>
                    <br/>
                    <label>Foto del producto:</label>
                    <br/>
                    <input type="text" 
                    name="modFoto"
                    id="modFoto" 
                    placeholder='Foto del producto (URL)'
                    required
                    value={modFoto}
                    onChange={e => setModFoto(e.target.value)}
                    maxLength={50}
                    />
                    <br/>
                    <br/>
                    <button type="submit" class="btn btn-primary">Modificar producto</button>
                </form>
        <hr />
        <h1>Eliminar producto</h1>
        <form onSubmit={handleEliminarProducto}>
        <select name="productos2" id="productos2" value={selectedProduct2} onChange={handleSelectChange2}>
        <option value="0" disabled>Selecciona un producto</option>
            {productos.map(product => (
                <React.Fragment key={product.cod}>
                    <option value={product.cod}>{product.nombre}</option>
                </React.Fragment>
            ))}
            </select>
            <br/>
            <br/>
        <button type="submit" class="btn btn-danger">Eliminar producto</button>
        </form>
        <hr />
        <h1>Lista de pedidos</h1>
        {pedidos.map(pedido => (
                <p>El usuario {pedido.username} ha realizado el pedido ({pedido.cod}), productos pedidos: {pedido.productos} cantidad : {pedido.producto_cantidad} Precio final: {pedido.total}€</p>
            ))}
        <hr />
        <h1>Eliminar pedido</h1>
        <form onSubmit={handleEliminarPedido}>
        <select name="pedidos2" id="pedidos2" value={selectedPedido2} onChange={handleSelectChange4}>
        <option value="0" disabled>Selecciona un pedido</option>
            {pedidos.map(pedido => (
                <React.Fragment key={pedido.cod}>
                    <option value={pedido.cod}>Usuario: {pedido.username} Productos: {pedido.productos} Importe: {pedido.total}€</option>
                </React.Fragment>
            ))}
            </select>
            <br/>
            <br/>
        <button type="submit" class="btn btn-danger">Eliminar pedido</button>
        </form>
        <hr />
        <h1>Lista de usuarios</h1>
        {sortedUsuarios.map((usuario, index) => {
          const title = index === 0 || usuario.tipo_usuario !== sortedUsuarios[index - 1].tipo_usuario
            ? <h2 style={{ marginBottom: '50px' }}>{tiposUsuario[usuario.tipo_usuario]}</h2>
            : null;

          return (
            <div key={usuario.cod} style={{ marginBottom: '20px' }}>
              {title}
              <div className="card" style={{width: "18rem"}}>
                <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h5 className="card-title">{usuario.username}</h5>
                  {usuario.tipo_usuario === 2 && (
                    <button value={usuario.cod} class="btn btn-danger" onClick={deleteUser}>Eliminar Usuario</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <hr />
      </div>
    </div>
  );
}

export default Admin;