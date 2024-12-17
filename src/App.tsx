import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import TutorDashboard from "./components/tutor/Dashboard";
import Classes from "./components/tutor/Classes";
import CourseContent from "./components/tutor/CourseContent";
import Students from "./components/tutor/Students";
import Activities from "./components/tutor/Activities";
import { SidebarProvider } from "./components/ui/sidebar";
import TutorLayout from "./layouts/TutorLayout";
import StudentLayout from "./layouts/StudentLayout";

function App() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student/login" element={<StudentLogin />} />

          {/* Student routes wrapped in the layout with sidebar */}
          <Route element={<StudentLayout />}>
            <Route path="/student/dashboard" element={<div>Dashboard del Estudiante</div>} />
            <Route path="/student/activities" element={<div>Actividades del Estudiante</div>} />
            <Route path="/student/settings" element={<div>Configuración del Estudiante</div>} />
          </Route>

          {/* Tutor routes wrapped in the layout with sidebar */}
          <Route element={<TutorLayout />}>
            <Route path="/tutor/dashboard" element={<TutorDashboard />} />
            <Route path="/tutor/course-content" element={<CourseContent />} />
            <Route path="/tutor/classes" element={<Classes />} />
            <Route path="/tutor/students" element={<Students />} />
            <Route path="/tutor/activities" element={<Activities />} />
            <Route path="/tutor/settings" element={<TutorDashboard />} />
          </Route>
        </Routes>
      </div>
    </SidebarProvider>
  );
}

export default App;