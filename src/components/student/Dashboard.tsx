import React from "react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DashboardProps {
  studentId: string;
}

const Dashboard = ({ studentId }: DashboardProps) => {
  const { data: student } = useQuery({
    queryKey: ["student", studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("id", studentId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: activities } = useQuery({
    queryKey: ["student-activities", studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_activities")
        .select("*")
        .eq("student_id", studentId)
        .order("assigned_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Bienvenido, {student?.first_name} {student?.last_name}
        </h2>
        <p className="text-muted-foreground">
          Aquí podrás ver tus actividades asignadas y tu progreso.
        </p>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Tus Actividades</h3>
        <div className="space-y-4">
          {activities?.map((activity) => (
            <div
              key={activity.id}
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <h4 className="font-medium">{activity.activity_title}</h4>
              {activity.activity_description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {activity.activity_description}
                </p>
              )}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">
                  Asignada: {new Date(activity.assigned_at).toLocaleDateString()}
                </span>
                {activity.completed_at && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Completada
                  </span>
                )}
              </div>
            </div>
          ))}
          {activities?.length === 0 && (
            <p className="text-muted-foreground text-center py-4">
              No tienes actividades asignadas aún.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;