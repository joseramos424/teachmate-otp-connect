import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type Student = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

type AssignedActivity = {
  id: string;
  student_id: string;
  activity_title: string;
  activity_description: string | null;
  assigned_at: string;
  completed_at: string | null;
};

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
    return <div className="p-8">Cargando contenido asignado...</div>;
  }

  const studentAssignments = students?.map((student) => ({
    ...student,
    activities: assignments?.filter(
      (assignment) => assignment.student_id === student.id
    ),
  }));

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contenido Asignado</h1>
      <div className="grid gap-6">
        {studentAssignments?.map((student) => (
          <Card key={student.id}>
            <CardHeader>
              <CardTitle>
                {student.first_name} {student.last_name}
              </CardTitle>
              <CardDescription>{student.email}</CardDescription>
            </CardHeader>
            <CardContent>
              {student.activities && student.activities.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {student.activities.map((activity) => (
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
                              handleUnassign(
                                activity.id,
                                activity.activity_title
                              );
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
                            Asignado:{" "}
                            {new Date(activity.assigned_at).toLocaleDateString()}
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
                              {activity.completed_at
                                ? "Completado"
                                : "Pendiente"}
                            </span>
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No hay contenido asignado
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssignedContent;