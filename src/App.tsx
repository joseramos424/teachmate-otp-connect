import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import TutorLayout from "./layouts/TutorLayout";
import StudentLayout from "./layouts/StudentLayout";
import Students from "./components/tutor/Students";
import Classes from "./components/tutor/Classes";
import Dashboard from "./components/tutor/Dashboard";
import AssignedContent from "./components/tutor/AssignedContent";
import StudentDashboard from "./components/student/Dashboard";
import SessionResults from "./components/student/SessionResults";
import { Toaster } from "./components/ui/toaster";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student" element={<StudentLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="activities" element={<StudentDashboard />} />
            <Route path="results" element={<SessionResults />} />
          </Route>
          <Route path="/tutor" element={<TutorLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="classes" element={<Classes />} />
            <Route path="assigned-content" element={<AssignedContent />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;