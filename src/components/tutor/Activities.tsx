import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import StudentActivities from "./StudentActivities";
import type { Student } from "@/types/students";

const Activities = () => {
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("first_name");

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los estudiantes",
        });
        throw error;
      }

      return data;
    },
  });

  if (isLoading) {
    return <div>Cargando estudiantes...</div>;
  }

  return (
    <div className="w-full min-h-screen p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-foreground">
        Actividades
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Lista de estudiantes */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Estudiantes</h2>
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="space-y-2">
              {students?.map((student) => (
                <Button
                  key={student.id}
                  variant={selectedStudent?.id === student.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedStudent(student)}
                >
                  {student.first_name} {student.last_name}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Panel de actividades */}
        <div className="lg:col-span-2">
          {selectedStudent ? (
            <StudentActivities student={selectedStudent} />
          ) : (
            <Card className="p-4">
              <p className="text-muted-foreground text-center">
                Selecciona un estudiante para ver y asignar actividades
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;