import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import TutorDashboard from "./components/tutor/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/tutor/dashboard" element={<TutorDashboard />} />
        <Route path="/tutor/students" element={<TutorDashboard />} />
        <Route path="/tutor/classes" element={<TutorDashboard />} />
        <Route path="/tutor/activities" element={<TutorDashboard />} />
        <Route path="/tutor/course-content" element={<TutorDashboard />} />
        <Route path="/tutor/settings" element={<TutorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;