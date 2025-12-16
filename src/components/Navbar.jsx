import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png'; 
import { NInicioSesion } from "./Modal.jsx";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          {/* Reemplaza el emoji con tu imagen */}
          <img src={logo} alt="SkinScan AI Logo" className="brand-logo-img" />
          <span className="brand-name">ECLIPSE</span>
        </div>
        
        <ul className="navbar-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link to="/scanner" className="nav-link active">Escáner</Link>
          </li>
          <li className="nav-item">
            <Link to="/history" className="nav-link">Historial</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">Acerca de</Link>
          </li>
        </ul>
        
        <div className="navbar-actions">
           <NInicioSesion />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;