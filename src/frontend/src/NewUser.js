import React, { useState } from 'react';
import LoginPage from './LoginPage';

import './App.css';

function NewUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        
        // Create user object
        const user = {
            username: username,
            pwd: password,
            tipo_usuario: 2
        };
        
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
            return <LoginPage />;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            return <LoginPage />;
        });
        };

    return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'beige' }}>
        <form onSubmit={handleSubmit} style={{backgroundColor: 'white'}}>
        <label><h1>Registrar usuario</h1></label>
        <br/>
            <label>
            Usuario:
            <br />
            <input type="text" value={username} placeholder='Usuario' onChange={e => setUsername(e.target.value)} />
            </label>
            <br />
            <br />
            <label>
            Contraseña:
            <br />
            <input type="password" value={password} placeholder='Contraseña' onChange={e => setPassword(e.target.value)} />
            </label>
            <br />
            <br />
            <input type="submit" class="btn btn-success" value="Registrar usuario" />
        </form>
    </div>
    );
}

export default NewUser;