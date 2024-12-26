import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type ClassStudentsListProps = {
  classId: string;
};

type Student = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

type StudentClassRelation = {
  student_id: string;
  students: Student;
};

const ClassStudentsList = ({ classId }: ClassStudentsListProps) => {
  const { data: students, isLoading, error } = useQuery({
    queryKey: ["class-students", classId],
    queryFn: async () => {
      console.log("Fetching students for class:", classId);
      const { data, error } = await supabase
        .from("students_classes")
        .select(
          `
          student_id,
          students (
            id,
            first_name,
            last_name,
            email
          )
        `
        )
        .eq("class_id", classId);

      if (error) {
        console.error("Error fetching students:", error);
        throw error;
      }

      console.log("Fetched data:", data);
      return data as StudentClassRelation[];
    },
  });

  if (isLoading) return (
    <div className="text-[#8E9196] animate-pulse">
      Cargando estudiantes...
    </div>
  );

  if (error) {
    console.error("Error displaying students:", error);
    return (
      <div className="text-red-500">
        Error al cargar los estudiantes
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {students && students.length > 0 ? (
        students.map((relation) => (
          <div 
            key={relation.student_id} 
            className="text-[#8E9196] text-sm hover:text-[#9b87f5] transition-colors"
          >
            {relation.students?.first_name} {relation.students?.last_name}
          </div>
        ))
      ) : (
        <div className="text-[#8E9196] italic text-sm">
          No hay estudiantes asignados
        </div>
      )}
    </div>
  );
};

export default ClassStudentsList;