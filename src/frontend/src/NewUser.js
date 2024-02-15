import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';

import './App.css';

function NewUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch('/usuarios')
            .then(response => response.json())
            .then(data => {
            const usuarios = data.map(usuario => ({ ...usuario}));
            setUsuarios(usuarios);
            });
        }, []);


    const handleSubmit = event => {
        event.preventDefault();

        // Validate username
        if (username.trim() === '' || username.includes(' ')) {
            alert('Invalid username. Username must contain at least one character and cannot contain spaces.');
            return;
        }
        
        // Create user object
        const user = {
            username: username,
            pwd: password,
            tipo_usuario: 2
        };

        // Check if username already exists
        const usernameExists = usuarios.some(usuario => usuario.username === user.username);

        if (usernameExists) {
            alert('Username already exists');
            return;
        }


        // Send POST request to /insertarUsuario
        fetch('./insertarUsuario', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return response.text();
        })
        .then(data => {
            console.log('User created', data);
          // Redirect to LoginPage
        
            alert('Usuario creado correctamente');
            window.location.reload();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            return <LoginPage />;
        });
    };

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
                <h2 style={{ color: 'white' }}>Registrar usuario</h2>
        </div>
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
                <br />
                <input type="text" value={username} placeholder='Usuario' onChange={e => setUsername(e.target.value)} maxLength={20} style={{ backgroundColor: '#8B2635', color: 'white', width: '400px', height: '50px'}} className="white-placeholder"/>
                </label>
                <br />
                <br />
                <label>
                Contraseña:
                <br />
                <input type="password" value={password} placeholder='Contraseña' onChange={e => setPassword(e.target.value)} maxLength={20} style={{ backgroundColor: '#8B2635', color: 'white', width: '400px' , height: '50px'}} className="white-placeholder"/>
                </label>
            </div>
                <br />
                <br />
                <div style={{ textAlign: 'center' }}>
                    <input type="submit" class="btn btn-success" value="Registrar usuario" style={{ padding: '10px 20px', fontSize: '18px', borderRadius: '5px' }}/>
                </div>
            </form>
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

export default NewUser;