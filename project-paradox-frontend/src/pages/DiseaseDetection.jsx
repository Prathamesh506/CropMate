// src/pages/DiseaseDetection.jsx

import React, { useState } from "react";
import Navbar from './Navbar';
import Info from './Info'; 
import "./DiseaseDetection.css";


function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await fetch(
        "https://16f8-2409-40f2-205e-9126-2127-65d5-dc9c-6b4f.ngrok-free.app/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setPrediction(`Prediction: ${data.prediction}`);
    } catch (error) {
      console.error("Error while predicting:", error);
      setPrediction("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        
       
    <Navbar />
    <div style={{ padding: "2rem" }}>
      <h2>Disease Detection</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? "Detecting..." : "Detect Disease"}
        </button>
      </form>
      {prediction && <p>{prediction}</p>}
    </div>
    <Info />

</>
  );
}

export default DiseaseDetection;
