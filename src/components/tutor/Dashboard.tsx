import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import CourseContent from "./CourseContent";
import Students from "./Students";
import { Users, BookOpen, School } from "lucide-react";

const TutorDashboard = () => {
  const location = useLocation();

  const { data: classesCount } = useQuery({
    queryKey: ["classes-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("classes")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return count || 0;
    },
  });

  const { data: studentsCount } = useQuery({
    queryKey: ["students-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("students")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return count || 0;
    },
  });

  const { data: assignedActivitiesCount } = useQuery({
    queryKey: ["assigned-activities-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("assigned_activities")
        .select("*", { count: "exact", head: true });

      if (error) throw error;
      return count || 0;
    },
  });

  const renderContent = () => {
    switch (location.pathname) {
      case "/tutor/course-content":
        return <CourseContent />;
      case "/tutor/students":
        return <Students />;
      case "/tutor/dashboard":
        return (
          <main className="container mx-auto p-6" role="main" aria-label="Panel de control">
            <div className="bg-gradient-to-r from-[#F6F6F7] to-[#E5DEFF] rounded-lg p-8 shadow-sm mb-8">
              <h1 className="text-3xl font-bold text-[#1A1F2C] mb-2">Panel de Control del Tutor</h1>
              <p className="text-[#8E9196]">
                Gestiona tus clases, estudiantes y contenido desde un solo lugar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white border-[#E5DEFF] hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-lg font-semibold text-[#1A1F2C]">Aulas Activas</CardTitle>
                  <School className="h-5 w-5 text-[#9b87f5]" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-[#1A1F2C]" aria-live="polite">
                    {classesCount ?? "..."}
                  </p>
                  <p className="text-[#8E9196] mt-1">Clases en curso</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#E5DEFF] hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-lg font-semibold text-[#1A1F2C]">Alumnos Totales</CardTitle>
                  <Users className="h-5 w-5 text-[#9b87f5]" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-[#1A1F2C]" aria-live="polite">
                    {studentsCount ?? "..."}
                  </p>
                  <p className="text-[#8E9196] mt-1">Estudiantes registrados</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#E5DEFF] hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-lg font-semibold text-[#1A1F2C]">Actividades Asignadas</CardTitle>
                  <BookOpen className="h-5 w-5 text-[#9b87f5]" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-[#1A1F2C]" aria-live="polite">
                    {assignedActivitiesCount ?? "..."}
                  </p>
                  <p className="text-[#8E9196] mt-1">Tareas en progreso</p>
                </CardContent>
              </Card>
            </div>
          </main>
        );
      default:
        return (
          <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-[#1A1F2C]">Página en construcción</h1>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-[#F6F6F7]" role="main">
      {renderContent()}
    </div>
  );
};

export default TutorDashboard;