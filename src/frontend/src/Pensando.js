import React from 'react';
import logo from './logo.svg'; // Import the logo.svg file
import './App.css'; // Import the App.css file



function Pensando() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo2" alt="logo" />
                <h2 id="Puntos"style={{ color: 'white', fontSize: '2em', position: 'fixed', top: '60%', left: '25%' }}>Pensando en la siguiente aplicación</h2>
            </header>
        </div>
    );
}

export default Pensando;