import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/student/Dashboard";

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  // Get student data from localStorage
  const studentDataString = localStorage.getItem('studentData');
  const student = studentDataString ? JSON.parse(studentDataString) : null;

  useEffect(() => {
    // If there's no student data, redirect to login
    if (!student) {
      navigate("/student/login", { replace: true });
    }
  }, [student, navigate]);

  if (!student) {
    return null;
  }

  return <Dashboard studentId={student.id} />;
};

export default StudentDashboard;