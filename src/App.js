import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/LoginPage";
import FacultyDashboard from "./components/FacultyDashboard";
import StudentDashboard from "./components/StudentDashboard";
import MarksEntryForm from "./pages/MarksEntryForm";
import ViewMarks from "./pages/ViewMarks";





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/facultyDashboard" element={<FacultyDashboard/>}/>
        <Route path="/studentDashboard" element={<StudentDashboard/>}/>
        <Route path="/marks-entry" element={<MarksEntryForm/>}/>
        <Route path="/view-marks" element={<ViewMarks/>}/>
      </Routes>
    </Router>
   
  );
}

export default App;