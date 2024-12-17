import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type ClassStudentsListProps = {
  classId: string;
};

const ClassStudentsList = ({ classId }: ClassStudentsListProps) => {
  const { data: students, isLoading } = useQuery({
    queryKey: ["class-students", classId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("students_classes")
        .select(`
          student_id,
          students (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq("class_id", classId);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Cargando estudiantes...</div>;

  return (
    <div className="text-sm space-y-1">
      {students && students.length > 0 ? (
        students.map((relation) => (
          <div key={relation.student_id} className="text-gray-600">
            {relation.students.first_name} {relation.students.last_name}
          </div>
        ))
      ) : (
        <div className="text-gray-500 italic">No hay estudiantes asignados</div>
      )}
    </div>
  );
};

export default ClassStudentsList;