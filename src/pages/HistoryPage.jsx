import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import "./History.css";
import { useFetch } from "../services/useFetch";

const HistoryPage = () => {
  const [historyList, setHistoryList] = useState([]);
  const [hasUser, setHasUser] = useState(false);
  const history = useFetch();
  const location = useLocation();

  useEffect(() => {
    const storedUserId = JSON.parse(sessionStorage.getItem("userId"));
    setHasUser(!!storedUserId);

    if (storedUserId) {
      history("history?user_id=" + storedUserId)
        .then((data) => {
          console.log("data", data);
          // Si la respuesta tiene la propiedad 'historial', usamos esa. Si no, un array vacío.
          setHistoryList(data?.historial || []);
        })
        .catch((err) => {
          console.error(err);
          setHistoryList([]);
        });
    } else {
      setHistoryList([]); // Limpiar historial si no hay usuario
    }
  }, [location]);
  console.log(historyList);

  return (
    <div className="scanner-page">
      <Navbar />
      <div className="scanner-container">
        <div className="scanner-header">
          <h1>Historial de Escaneos</h1>
          <p className="subtitle">Registro de análisis anteriores</p>
        </div>
      </div>
      <div className="scanner-list">
        {!hasUser ? (
          <div
            className="no-user-message"
            style={{
              textAlign: "center",
              marginTop: "2rem",
              gridColumn: "1 / -1",
            }}
          >
            <p>🔒 Inicia sesión para ver tu historial de escaneos.</p>
          </div>
        ) : historyList && historyList.length > 0 ? (
          historyList.map((char, index) => (
            <div key={char.lunar_id || index} className="scanner-item">
              <img
                src={char.imagen}
                alt={char.nombre || "Scan"}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h3>{char.nombre || "Sin nombre"}</h3>
              <p>{char.descripcion}</p>
              <p>
                <strong>Resultado:</strong> {char.resultado}
              </p>
              <p>
                <strong>Probabilidad:</strong> {char.probabilidad}
              </p>
            </div>
          ))
        ) : (
          <p>No hay historial disponible.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
