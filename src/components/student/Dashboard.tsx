import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const studentId = sessionStorage.getItem('studentId');

  useEffect(() => {
    if (!studentId) {
      navigate('/student');
    }
  }, [studentId, navigate]);

  const { data: activities, isLoading } = useQuery({
    queryKey: ["student-activities", studentId],
    queryFn: async () => {
      if (!studentId) return [];
      
      const { data, error } = await supabase
        .from("assigned_activities")
        .select("*")
        .eq('student_id', studentId)
        .order("assigned_at", { ascending: false });

      if (error) {
        console.error("Error fetching activities:", error);
        throw error;
      }

      return data;
    },
    enabled: !!studentId,
  });

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Actividades Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {pendingActivities?.length || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividades Completadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {completedActivities?.length || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total de Actividades</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{activities?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Actividades Asignadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities?.map((activity) => (
            <Card key={activity.id}>
              <CardHeader>
                <CardTitle>{activity.activity_title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">
                  {activity.activity_description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span>
                    Asignado: {new Date(activity.assigned_at).toLocaleDateString()}
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      activity.completed_at
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {activity.completed_at ? "Completado" : "Pendiente"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;