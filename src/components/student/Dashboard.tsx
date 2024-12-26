import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStudentActivities } from "@/hooks/useStudentActivities";
import { ActivitySummaryCards } from "./ActivitySummaryCards";
import { ActivityList } from "./ActivityList";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const studentId = sessionStorage.getItem('studentId');

  useEffect(() => {
    if (!studentId) {
      navigate('/student');
    }
  }, [studentId, navigate]);

  const { data: activities, isLoading } = useStudentActivities(studentId);

  if (!studentId) {
    return null;
  }

  if (isLoading) {
    return <div className="p-6">Cargando actividades...</div>;
  }

  const pendingActivities = activities?.filter(
    (activity) => !activity.completed_at
  );
  const completedActivities = activities?.filter(
    (activity) => activity.completed_at
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        Panel de Estudiante
      </h1>
      
      <ActivitySummaryCards
        pendingActivities={pendingActivities || []}
        completedActivities={completedActivities || []}
        totalActivities={activities?.length || 0}
      />

      <ActivityList activities={activities || []} />
    </div>
  );
};

export default StudentDashboard;