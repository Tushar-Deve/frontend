import React from "react";
import { useNavigate } from "react-router-dom";
// import "../style/Welcome.css";

export default function Welcome() {
  const navigate = useNavigate();
  const handleClick = () => {
    // console.log("Button clicked — navigate to login page");
    navigate("/login");
  };

  return (
    <div className="container-fluid position-fixed" 
    style={{
      backgroundImage: `url("/assets/enquiry-form-img.png")`,
      backgroundSize: "cover",
      height: "100vh",
      width: "100vw"
    }}>
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center container">
        <h1 className="mb-5 fw-bold" style={{ color: 'white', fontSize: '3rem' }}>
          Test Marks Entry and Viewer System
        </h1>
        <button className="btn btn-primary btn-lg fw-bold" onClick={handleClick}>
          Click here to visit
        </button>
      </div>
    </div>
  );
}

