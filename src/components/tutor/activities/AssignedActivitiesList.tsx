import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Student } from "@/types/students";

interface AssignedActivitiesListProps {
  student: Student;
}

const AssignedActivitiesList = ({ student }: AssignedActivitiesListProps) => {
  const { data: assignedActivities } = useQuery({
    queryKey: ["student-activities", student.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_activities")
        .select("*")
        .eq("student_id", student.id)
        .order("assigned_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (!assignedActivities?.length) return null;

  return (
    <div className="mb-6">
      <h3 className="text-md font-medium mb-2">Actividades Asignadas</h3>
      <div className="space-y-2 mb-4">
        {assignedActivities.map((activity) => (
          <div
            key={activity.id}
            className="p-3 bg-muted rounded-lg flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{activity.activity_title}</p>
              {activity.activity_description && (
                <p className="text-sm text-muted-foreground">
                  {activity.activity_description}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Asignada: {new Date(activity.assigned_at).toLocaleDateString()}
              </p>
            </div>
            {activity.completed_at && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Completada
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-border my-4"></div>
    </div>
  );
};

export default AssignedActivitiesList;