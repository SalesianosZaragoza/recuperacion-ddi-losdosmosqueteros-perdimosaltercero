import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage'; // Import LoginPage
import NewUser from './NewUser'; // Import NewUser

import './App.css';


function App({ username }) {
  const [productos, setProductos] = useState([]);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [isReceiptVisible, setIsReceiptVisible] = useState(false);

  

  const toggleReceipt = () => {
    setIsReceiptVisible(!isReceiptVisible);
  };

// Mapping of categoria to titles
const categoriaTitles = {
  1: 'Bocadillos',
  2: 'Café',
  3: 'Bollería',
  4: 'Aperitivos',
  5: 'Bebidas',
  6: 'Otros',
};

// Sort productos by categoria
const sortedProductos = [...productos].sort((a, b) => a.categoria - b.categoria);

useEffect(() => {
  fetch('./productos')
    .then(response => response.json())
    .then(data => {
      // Parse the prices as floating-point numbers and add a quantity property to each product
      const productosConCantidad = data.map(producto => ({ ...producto, precio: parseFloat(producto.precio), cantidad: 0 }));
      setProductos(productosConCantidad);
    });
}, []);

  const handlePagar = () => {
    const nombresProductos = productos
      .filter(producto => producto.cantidad > 0)
      .map(producto => producto.nombre);

      const totalProductos = productos
      .filter(producto => producto.cantidad > 0)
      .map(producto => producto.cantidad);

      if (totalPrecio === 0) {
        alert('No products selected. Please select a product before proceeding to payment.');
        return;
      }
      
    fetch('./insertarPedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username, productos: nombresProductos, producto_cantidad: totalProductos, total: totalPrecio}),
    })
    .then(response => {
      console.log(response.body);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      console.log('Order created', data);
      // Clear the cart
      alert("Pedido realizado correctamente." + "Precio total: " + totalPrecio + " €.");
      setProductos(productos.map(producto => ({ ...producto, cantidad: 0 })));
      setTotalPrecio(0);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };
  
  
  
  const handleQuantityChange = (id, event) => {
    const quantity = parseFloat(event.target.value); // Change this line
    if (quantity < 0) {
      return;
    }
    setProductos(productos => productos.map(producto => {
      if (producto.cod === id) {
        return { ...producto, cantidad: quantity }; // And this line
      } else {
        return producto;
      }
    }));
  };

  useEffect(() => {
    const newTotal = productos.reduce((sum, producto) => sum + producto.cantidad * producto.precio, 0);
    setTotalPrecio(parseFloat(newTotal.toFixed(2)));
  }, [productos]);

  return (
    <div style={{backgroundColor: 'beige'}}>
      <h1>¡Hola, {username}!</h1>

      <h2>Selecciona los productos que deseas comprar</h2>
      <div className="container">
  <div className="row">
    {sortedProductos.flatMap((product, index) => {
      // If it's the first product or if the categoria has changed, add a title
      const title = index === 0 || product.categoria !== sortedProductos[index - 1].categoria
        ? 
            <h2 style={{ marginBottom: '50px' }}>{categoriaTitles[product.categoria]}</h2>
        : null;
      
      return [
        title,
        <div key={product.cod} className="col-md-3" style={{ marginBottom: '20px' }}>
          <div className="card" style={{ width: '18rem', minHeight: '20rem', objectFit: 'cover' }}>
            <img className="card-img-top" title={product.descripcion} src={process.env.PUBLIC_URL + '/images/' + product.foto} alt={product.nombre} />
            <div className="card-body">
              <h5 className="card-title">{product.nombre}</h5>
              <p className="card-text">Precio: {product.precio.toFixed(2)} €</p>
              <input
                type="number"
                className="form-control"
                name={`cantidad${product.cod}`}
                id={`cantidad${product.cod}`}
                placeholder='Cantidad'
                min="0"
                onKeyPress={event => {
                  const inputValue = event.target.value;
                  if ((event.key === '-') || (event.key === '+') || (event.key === 'e') || (event.key=== 'E') || (inputValue === '' && event.key === '0')) event.preventDefault();
                }}
                onChange={event => handleQuantityChange(product.cod, event)}
              />
            </div>
          </div>
        </div>
      ];
    })}
  </div>
</div>
      <div id="zonaCompra" style={{  position: 'fixed', top: '10px', right: '10px'}}>
        <button id="pagarButton" onClick={handlePagar}>
          <img src="images/carrito.jpg" alt="Pagar" style={{ width: '135px', height: '135px' }} />
        </button>
        <p> Total: {totalPrecio} €</p>
        <p>Artículos seleccionados: {productos.reduce((total, product) => total + product.cantidad, 0)}</p>
      </div>
      <br/>
      <br/>
      <button onClick={toggleReceipt}>Mostrar/Ocultar Lista completa</button>
      {isReceiptVisible && (
        <footer>
          <h3>Detalles del pedido</h3>
          <p>{productos.map(product => `${product.nombre} seleccionadas: ${product.cantidad}`).join('\n')}</p><br/><br/>
        </footer>
      )}
    </div>
  );

}


export default App;
