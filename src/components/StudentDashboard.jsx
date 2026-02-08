import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [formData, setFormData] = useState({ roll_no: "", name: "" });
  const [results, setResults] = useState(null); // ARRAY
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Fetch student marks (MULTIPLE SUBJECTS)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/marks/student?roll_no=${formData.roll_no}&name=${formData.name}`
      );

      const data = await res.json();

      if (res.ok && Array.isArray(data) && data.length > 0) {
        setResults(data); // ✅ ARRAY store
      } else {
        setResults("not_found");
      }
    } catch (err) {
      console.error("Error fetching student marks:", err);
      setResults("error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
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
        <h2 className="text-primary mb-4">🎓 Student Dashboard</h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto p-4 border rounded shadow-sm"
          style={{ maxWidth: "400px", backgroundColor: "#f9f9f9" }}
        >
          <div className="mb-3 text-start">
            <label className="form-label">Roll Number:</label>
            <input
              type="text"
              name="roll_no"
              className="form-control"
              value={formData.roll_no}
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
            className="btn btn-danger w-100 my-2"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </form>

        {/* Result Section */}
        <div className="mt-4">
          {results === "not_found" && (
            <p className="text-danger fw-bold">❌ Result not found!</p>
          )}

          {results === "error" && (
            <p className="text-danger fw-bold">
              ⚠️ Unable to fetch result.
            </p>
          )}

          {Array.isArray(results) && (
            <div className="card p-3 mx-auto" style={{ maxWidth: "500px" }}>
              <h4 className="text-success mb-3">Result Found 🎯</h4>
              <hr />
              {results.map((item, index) => (
                <div key={index} className="mb-2">
                  <p>
                    <strong>Roll No:</strong> {item.roll_no}
                  </p>
                  <p>
                    <strong>Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Subject:</strong> {item.subject}
                  </p>
                  <p>
                    <strong>Marks:</strong> {item.marks}
                  </p>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


