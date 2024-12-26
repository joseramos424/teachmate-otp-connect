import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./components/student/Dashboard";
import TutorDashboard from "./components/tutor/Dashboard";
import Classes from "./components/tutor/Classes";
import CourseContent from "./components/tutor/CourseContent";
import Students from "./components/tutor/Students";
import Activities from "./components/tutor/Activities";
import { SidebarProvider } from "./components/ui/sidebar";
import TutorLayout from "./layouts/TutorLayout";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-login" element={<StudentLogin />} />
          
          {/* Student routes */}
          <Route path="/student" element={<StudentLogin />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          
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
      </Router>
    </QueryClientProvider>
  );
}

export default App;