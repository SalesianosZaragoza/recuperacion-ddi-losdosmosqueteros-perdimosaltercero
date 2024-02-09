import React, { useState } from "react";
import App from "./App";
import Admin from "./Admin";
import Pensando from './Pensando'; // Import the Pensando component
import logo from './logo.svg';
import './App.css';

import NewUser from "./NewUser";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [tipousuario, setTipo_usuario] = useState(Number);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false); // Add this line
  const [showPensando, setShowPensando] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();


    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        pwd: pwd,
        tipousuario: tipousuario,
      }),
    });
    if (response.ok) {
      setIsLoggedIn(true);
      setLoggedInUser(username);
      setTipo_usuario(tipousuario);
    } else {
      setIsLoggedIn(false);
      alert("Inicio de sesión fallido. Revisa tu usuario y contraseña.");
    }
    
    if (username === "admin") {
      setTipo_usuario(1);
    } else {
      setTipo_usuario(2);
    }

  };

  if (showPensando) {
    return <Pensando />;
  }

  const handleRegister = () => {
    setIsRegistering(true); // Set isRegistering to true when the button is clicked
  };

  if (isLoggedIn) {
    console.log(tipousuario);
    if (tipousuario === 1) {
      return <Admin />;
    } else if (tipousuario === 2) {
      return <App username={loggedInUser} />;
    }
  } else if (isRegistering) {
    return <NewUser />; // Render NewUser component if isRegistering is true
  } else {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: '#D80032',
          width: '100%',
          height: '106px'
        }}>
          <h2 style={{ color: 'white' }}>Inicio de sesión</h2>
        </div>
        <img src={logo} className="App-logo" alt="logo" onClick={() => setShowPensando(true)} />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',  
              backgroundColor: '#EDF2F4',
              flex: 1}}>
              
              <form onSubmit={handleSubmit} style={{backgroundColor: '#EDF2F4', padding: '80px', margin: '80px'}}>
              <br/>
              <div style={{ textAlign: 'left' }}>
              <label>
                Usuario:
                <br/>
                <input
                  type="text"
                  value={username}
                  placeholder="Usuario"
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ backgroundColor: '#8B2635', color: 'white', width: '400px', height: '50px'}}
                  className="white-placeholder"
                />
              </label>
                <br/>
                <br/>
                <label>
                  Contraseña:
                  <br/>
                  <input
                    type="password"
                    value={pwd}
                    placeholder="Contraseña"
                    onChange={(e) => setPwd(e.target.value)}
                    style={{ backgroundColor: '#8B2635', color: 'white', width: '400px' , height: '50px'}}
                    className="white-placeholder"
                  />
              </label>
              </div>
                <br/>
                <br/>
                <input type="submit" class="btn btn-primary" value="Iniciar sesión" style={{ marginLeft: '25px', marginRight: '75px', padding: '10px 20px', fontSize: '18px', borderRadius: '5px' }}/>
                <input type="button" class="btn btn-success" value="Registrarse" onClick={handleRegister} style={{ padding: '10px 20px', fontSize: '18px', borderRadius: '5px' }}/>
              </form>
              <br/>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: '#D80032',
              width: '100%',
              height: '50px'
            }}>
              <h4 style={{ color: 'white' }}>© 2024 - Carlos Ventura y Alejandro Tesan</h4>
            </div>
            <div id="salesianoszgz" style={{ position: 'fixed', top: '0px', left: '0px' }}>
              <a href="https://zaragoza.salesianos.edu/" target="_blank" rel="noopener noreferrer">
                <button id="salesianosButton">
                  <img src="images/salesianoszgz.jpg" alt="Salesianos" style={{ width: '300px', height: '100px' }} />
                </button>
              </a>
            </div>
      </div>
    );
  }
}

export default LoginPage;
