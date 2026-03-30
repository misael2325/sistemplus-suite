import React, { useState } from 'react';
import './Login.css';

const ADMIN_EMAIL = 'misael2325@gmail.com'; // Puedes cambiar esto al correo que prefieras

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      onLogin({ email, isAdmin });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <span className="material-icons login-icon">account_circle</span>
          <h2>Iniciar Sesión</h2>
          <p>Bienvenido a Sistem Plus Suite</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <div className="input-with-icon">
              <span className="material-icons">email</span>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-with-icon">
              <span className="material-icons">lock</span>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <span className="help-text">Ingresa cualquier contraseña (modo simulado)</span>
          </div>
          
          <button type="submit" className="login-btn">
            Ingresar
            <span className="material-icons">arrow_forward</span>
          </button>
        </form>
        
        <div className="login-footer">
          <p>Sistem Plus Suite © 2026</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
