import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type StudentAssignedContentProps = {
  studentId: string;
};

const StudentAssignedContent = ({ studentId }: StudentAssignedContentProps) => {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["student-assigned-activities", studentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assigned_activities")
        .select("*")
        .eq("student_id", studentId)
        .order("assigned_at", { ascending: false });

      if (error) {
        console.error("Error fetching assigned activities:", error);
        throw error;
      }

      return data;
    },
  });

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
        <AccordionItem key={activity.id} value={activity.id}>
          <AccordionTrigger className="text-sm">
            {activity.activity_title}
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-sm space-y-2">
              <p className="text-muted-foreground">
                {activity.activity_description}
              </p>
              <p className="text-xs text-muted-foreground">
                Asignado: {new Date(activity.assigned_at).toLocaleDateString()}
              </p>
              <p className="text-xs">
                Estado:{" "}
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    activity.completed_at
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {activity.completed_at ? "Completado" : "Pendiente"}
                </span>
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default StudentAssignedContent;