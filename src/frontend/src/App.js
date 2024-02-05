import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage'; // Import LoginPage
import NewUser from './NewUser'; // Import NewUser

import './App.css';


function App({ username }) {
  const [productos, setProductos] = useState([]);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [isReceiptVisible, setIsReceiptVisible] = useState(false);

  const cardStyle = {
    width: '18rem', 
    minHeight: '20rem', 
    objectFit: 'cover'
  };

  const toggleReceipt = () => {
    setIsReceiptVisible(!isReceiptVisible);
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

// Sort productos by categoria
const sortedProductos = [...productos].sort((a, b) => a.categoria - b.categoria);

  useEffect(() => {
    fetch('./productos')
      .then(response => response.json())
      .then(data => {
        // Add a quantity property to each product
        const productosConCantidad = data.map(producto => ({ ...producto, cantidad: 0 }));
        setProductos(productosConCantidad);
      });
  }, []);

  const handlePagar = () => {
    const nombresProductos = productos
      .filter(producto => producto.cantidad > 0)
      .map(producto => producto.nombre);
      
    fetch('./insertarPedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username, productos: nombresProductos, total: totalPrecio}),
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
      setProductos(productos.map(producto => ({ ...producto, cantidad: 0 })));
      setTotalPrecio(0);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };
  
  
  
  const handleQuantityChange = (id, event) => {
    const newQuantity = Number(event.target.value);
    setProductos(productos => productos.map(producto => {
      if (producto.cod === id) {
        return { ...producto, cantidad: newQuantity };
      } else {
        return producto;
      }
    }));
  };

  useEffect(() => {
    const newTotal = productos.reduce((sum, producto) => sum + producto.cantidad * producto.precio, 0);
    setTotalPrecio(newTotal);
  }, [productos]);

  return (
    <div style={{backgroundColor: 'beige'}}>
      <Router>
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/login" element={<LoginPage />} /> {/* Use element prop */}
          <Route path="/new-user" element={<NewUser />} /> {/* Use element prop */}
          {/* Add more Routes as needed */}
        </Routes>
      </Router>
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
              <p className="card-text">Precio: {product.precio} €</p>
              <input
                type="number"
                className="form-control"
                name={`cantidad${product.cod}`}
                id={`cantidad${product.cod}`}
                placeholder='Cantidad'
                onChange={event => handleQuantityChange(product.cod, event)}
              />
            </div>
          </div>
        </div>
      ];
    })}
  </div>
</div>

      <button onClick={handlePagar}>
        <img src="images/carrito.jpg" alt="Pagar" style={{ width: '200px', height: '200px' }} />
      </button>
      <br/>
      <br/>
      <button onClick={toggleReceipt}>Mostrar/Ocultar Lista completa</button>
      <p> Total: {totalPrecio}</p>
      <p>Artículos seleccionados: {productos.reduce((total, product) => total + product.cantidad, 0)}</p>
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
