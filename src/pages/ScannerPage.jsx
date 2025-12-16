import React, { useState } from 'react';
import './ScannerPage.css';
import Navbar from '../components/Navbar';

function ScannerPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setResponse("La imagen fue recibida correctamente ✅");
    }
  };

  return (
  <div className="scanner-page">
      <Navbar/>
      <div style={{ display: "flex", height: "100vh" }}>

        {/* Sección izquierda */}
       <div style={{ flex: 1, padding: "20px", borderRight: "2px solid #ccc" }}>
          <h2>Enviar Imagen</h2>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {selectedImage && (
            <div style={{ marginTop: "20px" }}>
            <img
              src={selectedImage}
              alt="preview"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
            </div>
          )}
      </div>

      {/* Sección derecha */}
        <div style={{ flex: 1, padding: "20px" }}>
          <h2>Respuesta</h2>
        <div
          style={{
            background: "#f5f5f5",
            padding: "15px",
            borderRadius: "8px",
            minHeight: "200px",
          }}
        >
          {response ? response : "Aquí aparecerá la respuesta..."}
        </div>
      </div>
    </div>
  </div>
  );
}

export default ScannerPage;
