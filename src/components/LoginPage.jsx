import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/LoginPage.css";

export default function LoginPage() {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showInbox, setShowInbox] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!role) {
    alert("⚠️ Please select a role before logging in!");
    return;
  }

  try {
    // ✅ Role ke hisaab se URL select karo
    const url =
      role === "faculty"
        ? `${process.env.REACT_APP_BACKEND_URL}/api/faculty/login`
        : `${process.env.REACT_APP_BACKEND_URL}/api/student/login`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert(`✅ ${role} Login Successful!`);
      if (role === "faculty") navigate("/facultyDashboard");
      else navigate("/studentDashboard");
    } else {
      alert(`❌ ${data.message}`);
      setFormData({ email: "", password: "" });
    }
  } catch (error) {
    console.error(error);
    alert("❌ Error connecting to backend!");
  }
};


  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: resetEmail }),
        }
      );
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("❌ Error sending reset link!");
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div
      className="container-fluid container-login"
      style={{
        backgroundImage: `url("/assets/all-bg.png")`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div className="d-flex flex-direction-row justify-content-between ">
        <button
          type="button"
          className="btn btn-primary"
          style={{ height: "3rem", marginTop: "1.3rem", paddingInline: "2rem" }}
          onClick={handleClick}
        >
          Back
        </button>

        <h2 className="mb-4 login-head d-flex flex-direction-row justify-content-center align-items-center">
          Login Portal
        </h2>

        <button
          type="button"
          className="btn btn-primary"
          style={{ height: "3rem", marginTop: "1.3rem", paddingInline: "1rem" }}
          onClick={() => setShowInbox(true)}
        >
          Inbox
        </button>
      </div>

      <div
        className={`inbox-slider ${showInbox ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: showInbox ? 0 : "-400px",
          width: "400px",
          height: "100vh",
          backgroundColor: "#f8f9fa",
          boxShadow: "-3px 0 8px rgba(0,0,0,0.2)",
          transition: "right 0.3s ease-in-out",
          zIndex: 9999,
          padding: "20px",
        }}
      >
        <button
          className="btn btn-danger mb-4"
          onClick={() => setShowInbox(false)}
          style={{ float: "right" }}
        >
          ✖
        </button>

        <h4 className="mb-4 mt-5">📥 Inbox Panel</h4>
      </div>

      <div className="container text-center container-box">
        <div className="container d-flex flex-direction-row align-items-center justify-content-center button-section ">
          <div className="mb-4">
            <button
              className="faculty-login-button"
              onClick={() => setRole("faculty")}
            >
              Faculty Login
            </button>
            <button
              className="student-login-button"
              onClick={() => setRole("student")}
            >
              Student Login
            </button>
          </div>
        </div>

        {role && !showForgot && (
          <form
            onSubmit={handleSubmit}
            className="mx-auto p-4"
            style={{ maxWidth: "500px", backgroundColor: "none" }}
          >
            <h4 className="mb-3" style={{ color: "white" }}>
              {role === "faculty" ? "Faculty" : "Student"} Login
            </h4>

            <div className="my-4 text-start">
              <label className="form-label" style={{ color: "white" }}>
                Email:
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="my-4 text-start">
              <label className="form-label" style={{ color: "white" }}>
                Password:
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary my-3 w-50">
              Login
            </button>

            <p
              className="text-white"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => setShowForgot(true)}
            >
              Forgot Password?
            </p>
          </form>
        )}

        {showForgot && (
          <form
            onSubmit={handleForgotSubmit}
            className="mx-auto p-4 mt-4 w-50"
          >
            <h4 className="mb-5 text-white">Reset Password</h4>
            <div className="mb-5 text-start">
              <label className="form-label text-white">
                Enter your registered email:
              </label>
              <input
                type="email"
                name="resetEmail"
                className="form-control"
                value={resetEmail}
                placeholder="Enter email here"
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-25 mb-4">
              Send Reset Link
            </button>
            <p
              className="text-white"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => setShowForgot(false)}
            >
              Back to Login
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

