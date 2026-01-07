import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
  const [formData, setFormData] = useState({ rollNo: "", name: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Backend se student ka result fetch karna
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://backend-ze0j.onrender.com/student?rollNo=${formData.rollNo}&name=${formData.name}`
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setResult("not_found");
      }
    } catch (error) {
      console.error("Error fetching result:", error);
      setResult("error");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    navigate("/login");
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
      <div className="container mt-5 text-center">
        <h2 className="text-primary mb-4">🎓 Student Login</h2>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto p-4 border rounded shadow-sm"
          style={{ maxWidth: "400px", backgroundColor: "#f9f9f9" }}
        >
          <div className="mb-3 text-start">
            <label className="form-label">Roll Number:</label>
            <input
              type="text"
              name="rollNo"
              className="form-control"
              value={formData.rollNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 my-2">
            {loading ? "Loading..." : "View Result"}
          </button>
          <button
            type="button"
            className="btn btn-danger fs-6 w-100 my-2 p-2"
            onClick={handleClick}
          >
            🚪 Logout
          </button>
        </form>

        {/* Result Section */}
        <div className="mt-4">
          {result === "not_found" && (
            <p className="text-danger fw-bold">❌ Result not found!</p>
          )}
          {result === "error" && (
            <p className="text-danger fw-bold">⚠️ Unable to fetch result.</p>
          )}
          {result && result !== "not_found" && result !== "error" && (
            <div className="card p-3 mx-auto" style={{ maxWidth: "400px" }}>
              <h4 className="text-success mb-3">Result Found 🎯</h4>
              <p><strong>Roll No:</strong> {result.rollNo}</p>
              <p><strong>Name:</strong> {result.name}</p>
              <p><strong>Subject:</strong> {result.subject}</p>
              <p><strong>Marks:</strong> {result.marks}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
