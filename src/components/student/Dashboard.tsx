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
      navigate('/student-login');
    }
  }, [studentId, navigate]);

  const { data: activitiesData, isLoading } = useStudentActivities(studentId);

  if (!studentId) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[#8E9196] text-lg">Cargando actividades...</p>
      </div>
    );
  }

  const activities = activitiesData?.map(activity => ({
    ...activity,
    results: activity.results as { correct: number; total: number } | null
  })) || [];

  const pendingActivities = activities.filter(
    (activity) => !activity.completed_at
  );
  const completedActivities = activities.filter(
    (activity) => activity.completed_at
  );

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#F6F6F7] to-[#E5DEFF] p-8 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-[#1A1F2C] mb-2">
          Panel de Estudiante
        </h1>
        <p className="text-[#8E9196]">
          Bienvenido a tu espacio de aprendizaje personalizado
        </p>
      </div>
      
      <ActivitySummaryCards
        pendingActivities={pendingActivities}
        completedActivities={completedActivities}
        totalActivities={activities.length}
      />

      <ActivityList activities={activities} />
    </div>
  );
};

export default StudentDashboard;