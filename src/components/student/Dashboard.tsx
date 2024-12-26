import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStudentActivities } from "@/hooks/useStudentActivities";
import { ActivitySummaryCards } from "./ActivitySummaryCards";
import { ActivityList } from "./ActivityList";
import { Json } from "@/integrations/supabase/types";

type Activity = {
  id: string;
  activity_title: string;
  activity_description: string;
  activity_path: string;
  assigned_at: string;
  completed_at: string | null;
  results?: {
    correct: number;
    total: number;
  } | null;
};

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
    return <div className="p-6">Cargando actividades...</div>;
  }

  const activities: Activity[] = activitiesData?.map(activity => ({
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-foreground">
        Panel de Estudiante
      </h1>
      
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