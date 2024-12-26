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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/iniciar-sesion" replace />} />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/estudiante/iniciar-sesion" element={<StudentLogin />} />
          <Route path="/estudiante" element={<StudentLayout />}>
            <Route path="inicio" element={<StudentDashboard />} />
            <Route path="actividades" element={<StudentDashboard />} />
            <Route path="resultados" element={<SessionResults />} />
          </Route>
          <Route path="/tutor" element={<TutorLayout />}>
            <Route path="inicio" element={<Dashboard />} />
            <Route path="estudiantes" element={<Students />} />
            <Route path="clases" element={<Classes />} />
            <Route path="contenido-asignado" element={<AssignedContent />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;