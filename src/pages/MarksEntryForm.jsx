import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MarksEntryForm() {
  const [formData, setFormData] = useState({
    roll_no: "",
    name: "",
    subject: "",
    marks: "",
  });

  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/facultyDashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.roll_no || !formData.name || !formData.subject || !formData.marks) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/marks/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData), // ✅ roll_no already correct
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setRecords([...records, formData]);
        setFormData({ roll_no: "", name: "", subject: "", marks: "" });
      } else {
        alert(data.message || "Error occurred ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error ❌");
    }
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

      <div className="container mt-5">
        <h3 className="text-center text-primary fw-bold mb-4">Marks Entry Form</h3>

        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded shadow-sm mx-auto"
          style={{ maxWidth: "500px", backgroundColor: "#f8f9fa" }}
        >
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Roll No:</label>
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
            <label className="form-label fw-semibold">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Subject:</label>
            <input
              type="text"
              name="subject"
              className="form-control"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Marks:</label>
            <input
              type="number"
              name="marks"
              className="form-control"
              value={formData.marks}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Submit
          </button>
        </form>

        {records.length > 0 && (
          <div className="mt-5">
            <h5 className="text-center text-secondary mb-3">Entered Records</h5>
            <table className="table table-bordered text-center">
              <thead className="table-light">
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec, index) => (
                  <tr key={index}>
                    <td>{rec.roll_no}</td>
                    <td>{rec.name}</td>
                    <td>{rec.subject}</td>
                    <td>{rec.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
