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
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" onClick={() => setShowPensando(true)} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'beige' }}>
              
              <form onSubmit={handleSubmit} style={{backgroundColor: 'white'}}>
              <label><h1>Iniciar sesión</h1></label>
              <br/>
                <label>
                  Usuario:
                  <br/>
                  <input
                    type="text"
                    value={username}
                    placeholder="Usuario"
                    onChange={(e) => setUsername(e.target.value)}
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
                  />
                </label>
                <br/>
                <br/>
                <input type="submit" class="btn btn-primary" value="Iniciar sesión" />
                <br/>
                <br/>
                <input type="button" class="btn btn-success" value="Registrarse" onClick={handleRegister} />
              </form>
              <br/>
            </div>
            <div id="salesianoszgz" style={{ position: 'fixed', top: '0px', left: '0px' }}>
              <a href="https://zaragoza.salesianos.edu/" target="_blank" rel="noopener noreferrer">
                <button id="salesianosButton">
                  <img src="images/salesianoszgz.jpg" alt="Salesianos"/>
                </button>
              </a>
            </div>
      </div>
    );
  }
}

export default LoginPage;
