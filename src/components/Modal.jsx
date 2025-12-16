import React, { useCallback, useEffect, useState } from "react";
import "./Modal.css";
import {useFetch} from "../services/useFetch"

function Modal({ isOpen, setIsOpen, title, inputs, isLogin = false, onLoginSuccess, onRegisterSuccess }) {
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useFetch()

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      
      // Validaciones básicas
      if (isLogin) {
        if (!formData.email || !formData.password) {
          throw new Error("Por favor, completa todos los campos");
        }
      } else {
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
          throw new Error("Por favor, completa todos los campos");
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Las contraseñas no coinciden");
        }
      }
      
      
      // Guardar SOLO el userId en sessionStorage
       form(isLogin ? "login/" : "register/", "POST", formData).then(data => {
         console.log(data);
        //  sessionStorage.setItem('userId', userId);
         
         console.log("✅ userId guardado en sessionStorage:");
         
         if (isLogin) {
           // Notificar al componente padre que el login fue exitoso
           if (onLoginSuccess) {
             onLoginSuccess();
           }
           
           alert(`✅ ¡Inicio de sesión exitoso! (ID: ...)`);
         } else {
           // Para registro
           alert("✅ ¡Registro exitoso! Ahora puedes iniciar sesión.");
           
           // Notificar al componente padre que el registro fue exitoso
           if (onRegisterSuccess) {
             onRegisterSuccess();
           }
         }
         
         // Cerrar el modal
         setIsOpen(false);
         
         // Limpiar el formulario
         if (inputs && inputs.length > 0) {
           const initialData = {};
           inputs.forEach(i => {
             initialData[i.id] = "";
           });
           setFormData(initialData);
         }
         
         
        }).catch(err => {
          console.error(err)
        });
      } catch (err) {
        console.error("Error:", err);
        setError(err.message || "Error al procesar la solicitud");
      } finally {
        setIsLoading(false);
      }
  

    
  }, [formData, isLogin, setIsOpen, inputs, onLoginSuccess, onRegisterSuccess]);

  useEffect(() => {
    if (!inputs || inputs.length === 0) return;
    
    const initialData = {};
    inputs.forEach(i => {
      initialData[i.id] = "";
    });
    
    setFormData(initialData);
    setError(null);
  }, [inputs, isOpen]);

  // Efecto para limpiar cuando se abre/cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        
        {/* Mostrar errores */}
        {error && (
          <div className="modal-error">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{error}</span>
          </div>
        )}
        
        <form onSubmit={onSubmit}>
          {inputs.map((input, index) => (
            <div className="form-group" key={index}>
              <label htmlFor={input.id}>{input.label}</label>
              <input
                type={input.type}
                id={input.id}
                placeholder={input.placeholder}
                value={formData[input.id] || ""}
                onChange={(e) =>
                  setFormData(prev => ({
                    ...prev,
                    [input.id]: e.target.value
                  }))
                }
                disabled={isLoading}
                required
              />
            </div>
          ))}

          <button 
            type="submit" 
            className="btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Procesando...
              </>
            ) : isLogin ? (
              "Iniciar Sesión"
            ) : (
              "Registrarse"
            )}
          </button>
        </form>

        <button 
          className="close-btn" 
          onClick={handleClose}
          disabled={isLoading}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;