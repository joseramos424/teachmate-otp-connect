import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import TutorLayout from "./layouts/TutorLayout";
import Students from "./components/tutor/Students";
import Classes from "./components/tutor/Classes";
import Dashboard from "./components/tutor/Dashboard";
import AssignedContent from "./components/tutor/AssignedContent";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/tutor" element={<TutorLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="classes" element={<Classes />} />
          <Route path="assigned-content" element={<AssignedContent />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;