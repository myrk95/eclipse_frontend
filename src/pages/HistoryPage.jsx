import React  from 'react';
import {useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import './History.css';
import { useFetch } from "../services/useFetch";


const HistoryPage = () => {
  const [datos, setDatos] = useState([]); 
  
  useEffect(() => { 
    fetch("https://rickandmortyapi.com/api/character/?page=19") 
    .then(res => res.json()) 
    .then(data => setDatos(data.results)) 
    .catch(err => console.error(err)); }, 
  []); // [] asegura que se ejecute solo una vez al montar

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
         {datos.length > 0 ? (
            datos.map((char) => (
              <div key={char.id} className="scanner-item">
                <img src={char.image} alt={char.name} />
                <h3>{char.name}</h3>
                <p>Estado: {char.status}</p>
                <p>Especie: {char.species}</p>
                <p>Origen: {char.origin.name}</p>
              </div>
            ))
          ) : (
            <p>Cargando personajes...</p>
          )}
        </div>
      </div>
  );
};

export default HistoryPage;