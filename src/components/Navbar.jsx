import React, { useState, useEffect, use } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import Modal from "./Modal";
import { useFetch } from "../services/useFetch";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const userProfile = useFetch();
  const [userId, setUserId] = useState(null);

  // Verificar si el usuario está logueado al cargar y cuando cambia la ruta
  useEffect(() => {
    const storedUserId = JSON.parse(sessionStorage.getItem("userId"));
    setUserId(storedUserId);
    setIsLoggedIn(!!storedUserId); // Convierte a booleano: true si hay userId, false si no
  }, [location.pathname]);
  useEffect(() => {
    const returnUser = async () => {
      if (userId) {
        try {
          const user = await userProfile("profile?user_id=" + userId);
          setUser(user);
        } catch (error) {
          console.log(error);
        }
      }
    };
    returnUser();
  }, [userId]);
  // Función para manejar login exitoso
  const handleLoginSuccess = () => {
    const storedUserId = JSON.parse(sessionStorage.getItem("userId"));
    setUserId(storedUserId);
    setIsLoggedIn(!!storedUserId);
    setIsModalOpen(false);
  };

  // Función para manejar registro exitoso
  const handleRegisterSuccess = () => {
    const storedUserId = JSON.parse(sessionStorage.getItem("userId"));
    setUserId(storedUserId);
    setIsLoggedIn(!!storedUserId);
    setIsModalRegisterOpen(false);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    // Solo limpiamos el userId
    sessionStorage.removeItem("userId");
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
          <Link to="/">
            {" "}
            <img src={logo} alt="Eclipse Logo" className="brand-logo-img" />
          </Link>
          <span className="brand-name">ECLIPSE</span>
        </div>

        <ul className="navbar-menu">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/scanner"
              className={`nav-link ${isActive("/scanner") ? "active" : ""}`}
            >
              Escáner
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/history"
              className={`nav-link ${isActive("/history") ? "active" : ""}`}
            >
              Historial
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className={`nav-link ${isActive("/about") ? "active" : ""}`}
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
                <span className="user-id">{user?.profile?.username}</span>
              </div>
              <button className="btn-logout" onClick={handleLogout}>
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
              {
                id: "email",
                label: "Correo electrónico",
                type: "email",
                placeholder: "ejemplo@email.com",
              },
              {
                id: "password",
                label: "Contraseña",
                type: "password",
                placeholder: "••••••••",
              },
            ]}
            onLoginSuccess={handleLoginSuccess}
          />

          <Modal
            isOpen={isModalRegisterOpen}
            setIsOpen={setIsModalRegisterOpen}
            title="Regístrate"
            inputs={[
              {
                id: "username",
                label: "Nombre de Usuario",
                type: "text",
                placeholder: "Tu nombre de usuario",
              },
              {
                id: "email",
                label: "Correo electrónico",
                type: "email",
                placeholder: "ejemplo@email.com",
              },
              {
                id: "password",
                label: "Contraseña",
                type: "password",
                placeholder: "••••••••",
              },
              {
                id: "confirmPassword",
                label: "Confirmar Contraseña",
                type: "password",
                placeholder: "••••••••",
              },
            ]}
            onRegisterSuccess={handleRegisterSuccess}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
