import { useState, useEffect } from 'react'


import './App.css';


function App({ username }) {
  const [productos, setProductos] = useState([]);
  const [totalPrecio, setTotalPrecio] = useState(0);

  const [isReceiptVisible, setIsReceiptVisible] = useState(false);

  const toggleReceipt = () => {
    setIsReceiptVisible(!isReceiptVisible);
  };

  useEffect(() => {
    fetch('/productos')
      .then(response => response.json())
      .then(data => {
        // Add a quantity property to each product
        const productosConCantidad = data.map(producto => ({ ...producto, cantidad: 0 }));
        setProductos(productosConCantidad);
      });
  }, []);
  
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
    <div>
      <h1>¡Hola, {username}!</h1>
      {productos.map(product => (
        <div key={product.cod}>
          <h2>{product.nombre}</h2>
          <input type="number" 
          name={`cantidad${product.cod}`} 
          id={`cantidad${product.cod}`} 
          placeholder='Cantidad'
          onChange={event => handleQuantityChange(product.cod, event)}/>
          <p>{product.precio}</p>
          <img title={product.descripcion} src={product.foto} alt={product.nombre} />
          
        </div>
      ))}
      <button type="submit">Pagar</button>
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
