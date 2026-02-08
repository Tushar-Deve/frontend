import React from "react";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login"); // Redirect to Welcome Page
  };

  return (
    <div className="container-fluid faculty-section position-fixed" style={{backgroundImage: `url("/assets/all-bg.png")`,
    backgroundSize: "cover",
    height: "100vh",
    width:"100vw"}}>
   
      <div className="container">
        <div className="mt-5 text-center">
          <h2 className=" mt-5 text-primary fw-bold">Faculty Dashboard</h2>

          <div className="d-flex flex-column align-items-center mt-5">
            {/* Button for Marks Entry */}
            <button
              className="btn btn-success fs-4 w-50 my-4 p-2"
              onClick={() => navigate("/marks-entry")}
            >
              ➕ Enter Test Marks
            </button>

            {/* Button for Viewing Marks */}
            <button
              className="btn btn-info fs-4 w-50 my-4 p-2"
              onClick={() => navigate("/view-marks")}
            >
              📋 View All Marks
            </button>

            {/* Logout Button */}
            <button className="btn btn-danger fs-4 w-50 my-4 p-2" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
