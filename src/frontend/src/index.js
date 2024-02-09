import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginPage from './LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pensando from './Pensando';

const root = ReactDOM.createRoot(
    document.getElementById('root')
  );
  console.log(root)
  root.render(<LoginPage />);