import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

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
        console.error("Error fetching assigned activities:", error);
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
        <AccordionItem key={activity.id} value={activity.id}>
          <AccordionTrigger className="text-sm">
            <div className="flex items-center justify-between w-full pr-4">
              <span>{activity.activity_title}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnassign(activity.id, activity.activity_title);
                }}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
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