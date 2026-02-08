import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewMarks() {
  const [marksData, setMarksData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/marks`);
      setMarksData(res.data);
    } catch (err) {
      console.error("Error fetching marks:", err);
      alert("Error fetching data ❌");
    }
  };

  const handleDelete = async (roll_no) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/marks/delete/${roll_no}`);
      alert("Record deleted successfully ✅");
      setMarksData(marksData.filter((item) => item.roll_no !== roll_no));
    } catch (err) {
      console.error("Error deleting record:", err);
      alert("Error deleting record ❌");
    }
  };

  const handleClick = () => {
    navigate("/facultyDashboard");
  };

  return (
    <div
      className="container-fluid position-fixed"
      style={{
        backgroundImage: `url("/assets/all-bg.png")`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
      }}
    >
      <button
        type="button"
        className="btn btn-primary"
        style={{ height: "3rem", marginTop: "1.3rem", paddingInline: "2rem" }}
        onClick={handleClick}
      >
        Back
      </button>

      <div className="container mt-4">
        <h2 className="text-center mb-4 text-primary">📋 View Test Marks</h2>

        <table className="table table-bordered table-striped shadow-sm">
          <thead className="table-dark">
            <tr>
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
                  <td>{row.roll_no}</td>
                  <td>{row.name}</td>
                  <td>{row.subject}</td>
                  <td>{row.marks}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(row.roll_no)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
