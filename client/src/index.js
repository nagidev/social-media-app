import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext'
import App from './App'

//import 'bootstrap/dist/css/bootstrap.min.css'
import './scss/custom.scss'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);