import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';  
import Modal from './Modal';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Verificar si el usuario está logueado al cargar y cuando cambia la ruta
  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    setIsLoggedIn(!!userId); // Convierte a booleano: true si hay userId, false si no
  }, [location.pathname]);

  // Función para manejar login exitoso
  const handleLoginSuccess = () => {
    const userId = sessionStorage.getItem('userId');
    setIsLoggedIn(!!userId);
    setIsModalOpen(false);
  };

  // Función para manejar registro exitoso
  const handleRegisterSuccess = () => {
    setIsModalRegisterOpen(false);
    setIsModalOpen(true); // Abrir modal de login después de registrarse
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    // Solo limpiamos el userId
    sessionStorage.removeItem('userId');
    setIsLoggedIn(false);
    window.location.reload(); // Recargar para reflejar cambios en toda la app
  };

  // Verificar si la ruta actual es activa
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={logo} alt="Eclipse Logo" className="brand-logo-img" />
          <span className="brand-name">ECLIPSE</span>
        </div>
        
        <ul className="navbar-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/scanner" 
              className={`nav-link ${isActive('/scanner') ? 'active' : ''}`}
            >
              Escáner
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/history" 
              className={`nav-link ${isActive('/history') ? 'active' : ''}`}
            >
              Historial
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              Acerca de
            </Link>
          </li>
        </ul>
        
        <div className="navbar-actions">
          {isLoggedIn ? (
            // Mostrar cuando el usuario está logueado
            <div className="user-section">
              <div className="user-info">
                <span className="user-icon">👤</span>
                <span className="user-id">Usuario #{sessionStorage.getItem('userId')?.substring(0, 8)}</span>
              </div>
              <button 
                className="btn-logout"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            // Mostrar cuando el usuario NO está logueado
            <div className="auth-buttons">
              <button 
                className="btn-login"
                onClick={() => setIsModalOpen(true)}
              >
                Iniciar Sesión
              </button>
              <button 
                className="btn-register"
                onClick={() => setIsModalRegisterOpen(true)}
              >
                Registrarse
              </button>
            </div>
          )}
          
          {/* Modales */}
          <Modal 
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            isLogin={true}
            title="Iniciar Sesión"
            inputs={[
              { id: "email", label: "Correo electrónico", type: "email", placeholder: "ejemplo@email.com" },
              { id: "password", label: "Contraseña", type: "password", placeholder: "••••••••" }
            ]}
            onLoginSuccess={handleLoginSuccess}
          />
          
          <Modal 
            isOpen={isModalRegisterOpen}
            setIsOpen={setIsModalRegisterOpen}
            title="Regístrate"
            inputs={[
              { id: "username", label: "Nombre de Usuario", type: "text", placeholder: "Tu nombre de usuario" },
              { id: "email", label: "Correo electrónico", type: "email", placeholder: "ejemplo@email.com" },
              { id: "password", label: "Contraseña", type: "password", placeholder: "••••••••" },
              { id: "confirmPassword", label: "Confirmar Contraseña", type: "password", placeholder: "••••••••" }
            ]}
            onRegisterSuccess={handleRegisterSuccess}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;