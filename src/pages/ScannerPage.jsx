import React, { useEffect, useState } from "react";
import "./ScannerPage.css";
import Navbar from "../components/Navbar";
import { useFetchForm } from "../services/useFetch";

function ScannerPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Estado para el archivo real
  const [response, setResponse] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();
  const fetchForm = useFetchForm();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Guardamos el archivo para enviarlo luego
      setSelectedImage(URL.createObjectURL(file)); // URL solo para previsualización
      setResponse("La imagen fue recibida correctamente ✅");
    }
  };
  console.log("selectedImage", selectedImage);
  console.log("imageFile", imageFile);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(name);

    if (!imageFile) {
      alert("Por favor selecciona una imagen");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("nom", name);
      // En web se pasa el archivo directo. El tercer parámetro es el nombre del archivo.
      formData.append("image", imageFile, `mole_${userId}_${Date.now()}.jpg`);
      formData.append("user_id", userId);
      const response = await fetchForm("analysis_result/", formData);
      console.log("response", response);
      setResult(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const dataUser = async () => {
      setUserId(JSON.parse(sessionStorage.getItem("userId")));
    };
    dataUser();
  });
  return (
    <div className="scanner-page">
      <Navbar />
      <div style={{ display: "flex" }}>
        {/* Sección izquierda */}
        <div
          style={{ flex: 1, padding: "20px", borderRight: "2px solid #ccc" }}
        >
          <h2>Enviar Imagen</h2>
          <div className="form-scanner">
            <form>
              <div>
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {selectedImage && (
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={selectedImage}
                    alt="preview"
                    style={{ width: "15rem", borderRadius: "8px" }}
                  />
                </div>
              )}
              <button
                type="submit"
                className="button-form"
                onClick={onSubmit}
                disabled={isLoading}
                style={{
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                {isLoading ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      className="spinner"
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "3px solid rgba(255,255,255,0.3)",
                        borderTopColor: "white",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    ></span>
                    Enviando...
                  </div>
                ) : (
                  "Enviar Análisis"
                )}
              </button>
            </form>
          </div>
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
            {result ? (
              <>
                <p>Probabilidad: {result.probabilidad}</p>
                <p>Resultado: {result.resultado}</p>
              </>
            ) : (
              "Aquí aparecerá la respuesta..."
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScannerPage;
