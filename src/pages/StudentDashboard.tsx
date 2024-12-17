import { Dashboard } from "@/components/student/Dashboard";

const StudentDashboard = () => {
  // Get student data from localStorage
  const studentDataString = localStorage.getItem('studentData');
  const student = studentDataString ? JSON.parse(studentDataString) : null;

  if (!student) {
    return (
      <div className="p-6">
        <p className="text-center text-muted-foreground">
          No se encontró información del estudiante. Por favor, inicie sesión nuevamente.
        </p>
      </div>
    );
  }

  return <Dashboard studentId={student.id} />;
};

export default StudentDashboard;