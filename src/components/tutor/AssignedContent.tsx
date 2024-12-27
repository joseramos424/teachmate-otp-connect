import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import StudentCard from "./assigned-content/StudentCard";
import { Student, AssignedActivity } from "./assigned-content/types";

const AssignedContent = () => {
  const queryClient = useQueryClient();

  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ["all-students"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("first_name");

      if (error) throw error;
      return data as Student[];
    },
  });

  const { data: assignments, isLoading: assignmentsLoading } = useQuery({
    queryKey: ["all-assignments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assigned_activities")
        .select("*")
        .order("assigned_at", { ascending: false });

      if (error) throw error;
      return data as AssignedActivity[];
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
      queryClient.invalidateQueries({ queryKey: ["all-assignments"] });
    } catch (error) {
      console.error("Error al desasignar actividad:", error);
      toast.error("Error al desasignar la actividad");
    }
  };

  if (studentsLoading || assignmentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-[#8E9196] animate-pulse">Cargando contenido asignado...</div>
      </div>
    );
  }

  const studentAssignments = students?.map((student) => ({
    ...student,
    activities: assignments?.filter(
      (assignment) => assignment.student_id === student.id
    ),
  }));

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1F2C] mb-2">
          Contenido Asignado
        </h1>
        <p className="text-[#8E9196]">
          Gestiona el contenido asignado a cada estudiante
        </p>
      </div>

      <div className="grid gap-6">
        {studentAssignments?.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onUnassign={handleUnassign}
          />
        ))}
      </div>
    </div>
  );
};

export default AssignedContent;