import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewMarks() {
  const [marksData, setMarksData] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch data from backend
  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/marks");
      setMarksData(res.data);
    } catch (err) {
      console.error("Error fetching marks:", err);
      alert("Error fetching data");
    }
  };

  // ✅ Delete record
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/marks/delete/${id}`);
      alert("Record deleted successfully ✅");
      setMarksData(marksData.filter((item) => item.id !== id)); // frontend update
    } catch (err) {
      console.error("Error deleting record:", err);
      alert("Error deleting record");
    }
  };

  const handleClick = () => {
    navigate("/facultyDashboard");
  };

  return (
    <div className="container-fluid position-fixed"
      style={{
        backgroundImage: `url("/assets/all-bg.png")`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
      }}>
      <button type="submit" className="btn btn-primary" style={{ height: "3rem", marginTop: "1.3rem", paddingInline: "2rem" }} onClick={handleClick}>
        Back
      </button>

      <div className="container mt-4">
        <h2 className="text-center mb-4 text-primary">📋 View Test Marks</h2>

        <table className="table table-bordered table-striped shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Roll No</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {marksData.length > 0 ? (
              marksData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.rollNo}</td>
                  <td>{row.name}</td>
                  <td>{row.subject}</td>
                  <td>{row.marks}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(row.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center">No records found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
