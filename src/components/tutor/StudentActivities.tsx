import React from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Student } from "@/types/students";
import type { ContentItem } from "./course/courseData";
import AssignedActivitiesList from "./activities/AssignedActivitiesList";
import AvailableActivities from "./activities/AvailableActivities";

interface StudentActivitiesProps {
  student: Student;
}

const StudentActivities = ({ student }: StudentActivitiesProps) => {
  const { toast } = useToast();

  const handleAssignActivity = async (activity: ContentItem) => {
    try {
      const { error } = await supabase.from("student_activities").insert({
        student_id: student.id,
        activity_title: activity.title,
        activity_description: activity.description,
      });

      if (error) throw error;

      toast({
        title: "Actividad asignada",
        description: `Se asignó "${activity.title}" a ${student.first_name} ${student.last_name}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo asignar la actividad",
      });
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        Actividades para {student.first_name} {student.last_name}
      </h2>

      <AssignedActivitiesList student={student} />

      <AvailableActivities onAssignActivity={handleAssignActivity} />
    </Card>
  );
};

export default StudentActivities;