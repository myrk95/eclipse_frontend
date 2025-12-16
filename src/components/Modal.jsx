import React, { useState, useEffect} from "react";
import "./Modal.css"; // estilos básicos

function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Iniciar Sesión</h2>
        <form>
          <div className="form-group1">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" placeholder="tu@email.com" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" placeholder="********" />
          </div>
          <button type="submit" className="btn">Entrar</button>
        </form>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export function InicioSesion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
    
  useEffect(() => { setIsModalOpen(true); }, []);
  return (
    <div>
        <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export function NInicioSesion() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <button className="btn-in" onClick={() => setIsModalOpen(true)}>Iniciar Sesión</button>
            <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </div>
    )
}
