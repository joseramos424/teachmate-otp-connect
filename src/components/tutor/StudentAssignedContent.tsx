import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Accordion } from "@/components/ui/accordion";
import { toast } from "sonner";
import ActivityItem from "./student-assigned/ActivityItem";

type StudentAssignedContentProps = {
  studentId: string;
};

const StudentAssignedContent = ({ studentId }: StudentAssignedContentProps) => {
  const queryClient = useQueryClient();
  
  const { data: activities, isLoading } = useQuery({
    queryKey: ["student-assigned-activities", studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assigned_activities")
        .select("*")
        .eq("student_id", studentId)
        .order("assigned_at", { ascending: false });

      if (error) {
        console.error("Error al obtener actividades asignadas:", error);
        throw error;
      }

      return data;
    },
  });

  const handleUnassign = async (activityId: string, activityTitle: string) => {
    try {
      const { error } = await supabase
        .from("assigned_activities")
        .delete()
        .eq("id", activityId);

      if (error) throw error;

      toast.success(`Actividad "${activityTitle}" desasignada correctamente`);
      queryClient.invalidateQueries({ queryKey: ["student-assigned-activities", studentId] });
    } catch (error) {
      console.error("Error al desasignar actividad:", error);
      toast.error("Error al desasignar la actividad");
    }
  };

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Cargando...</div>;
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-sm text-muted-foreground italic">
        No hay contenido asignado
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          onUnassign={handleUnassign}
        />
      ))}
    </Accordion>
  );
};

export default StudentAssignedContent;