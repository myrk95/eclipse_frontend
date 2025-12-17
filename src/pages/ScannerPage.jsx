import React, { useEffect, useState } from 'react';
import './ScannerPage.css';
import Navbar from '../components/Navbar';
import useFetchData from '../services/useFetch'

function ScannerPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState("");
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [userId, setUserId] = useState(0)
  const useFetchData = useFetchForm()


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setResponse("La imagen fue recibida correctamente ✅");
    }
  };
  const onSubmit = (e) => {
    e.preventDefault()
console.log(name, description);
    const asset = `mole_${userId}_${Date.now()}.jpg`
    const formData = new FormData()
    formData.append("nom", name)
    formData.append("descripcio", description)
    formData.append("image", {
      uri: selectedImage,
      name: asset,
      type: "image/jpeg"
    })
    const response = useFetchData('analysis_result/', formData)
    console.log("response", response);
    
  }
  useEffect(() => {
    const dataUser = async() => {
      setUserId(JSON.parse(sessionStorage.getItem("userId"))
      )
    }
    dataUser()
  })
  return (
  <div className="scanner-page">
      <Navbar/>
      <div style={{ display: "flex"}}>

        {/* Sección izquierda */}
       <div style={{ flex: 1, padding: "20px", borderRight: "2px solid #ccc" }}>
          <h2>Enviar Imagen</h2>
          <div className='form-scanner'>
            <form>

            <div>
            <label htmlFor='name' >Nombre</label>
            <input type="text" name='name' id='name' onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
            <label htmlFor='description' >Descripcion</label>
            <input type="text" name='description' id='description' onChange={(e) => setDescription(e.target.value)}/>
            </div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {selectedImage && (
            <div style={{ marginTop: "20px", display: 'flex', justifyContent: 'center'}}>
            <img
              src={selectedImage}
              alt="preview"
              style={{ width: "15rem", borderRadius: "8px" }}
            />
            </div>
          )}
          <input type='submit' className='button-form' onClick={onSubmit}/>
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
          {response ? response : "Aquí aparecerá la respuesta..."}
        </div>
      </div>
    </div>
  </div>
  );
}

export default ScannerPage;
