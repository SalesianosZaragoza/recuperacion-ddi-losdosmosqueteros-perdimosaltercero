import React, { useState } from 'react';
import App from './App';
import Admin from './Admin';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, pwd }),
    });
    console.log(response.body);
    if (response.ok) {
        setIsLoggedIn(true);
        setLoggedInUser(username);
    } else {
        setIsLoggedIn(false);
        alert('Inicio de sesión fallido. Revisa tu usuario y contraseña.');
    }
  };

  

  if (isLoggedIn) {
    // return <App username={loggedInUser}/>;
    return <Admin />;
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} />
        </label>
        <input type="submit" value="Log in" />
      </form>
    );
  }
}

export default LoginPage;