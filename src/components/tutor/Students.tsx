import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StudentsTable from "./StudentsTable";
import StudentFormDialog from "./students/StudentFormDialog";
import { useStudentMutations } from "./students/useStudentMutations";
import type { Student } from "@/types/students";

const Students = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);

  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: selectedStudentClasses } = useQuery({
    queryKey: ["student-classes", selectedStudent?.id],
    queryFn: async () => {
      if (!selectedStudent?.id) return [];
      const { data, error } = await supabase
        .from("students_classes")
        .select("class_id")
        .eq("student_id", selectedStudent.id);

      if (error) throw error;
      return data.map(item => item.class_id);
    },
    enabled: !!selectedStudent?.id,
  });

  const { addStudentMutation, updateStudentMutation, deleteStudentMutation } = useStudentMutations();

  const handleSubmit = (data: any, selectedClasses: string[]) => {
    if (selectedStudent) {
      updateStudentMutation.mutate({ 
        id: selectedStudent.id, 
        data, 
        classIds: selectedClasses 
      });
    } else {
      addStudentMutation.mutate({ 
        studentData: data, 
        classIds: selectedClasses 
      });
    }
    handleDialogClose();
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const handleDelete = (student: Student) => {
    if (window.confirm(`¿Está seguro que desea eliminar a ${student.first_name} ${student.last_name}?`)) {
      deleteStudentMutation.mutate(student.id);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedStudent(null);
  };

  if (isLoading) {
    return (
      <div className="p-8" role="status" aria-live="polite">
        Cargando estudiantes...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Estudiantes</h1>
        <Button 
          onClick={() => setIsDialogOpen(true)} 
          aria-label="Agregar nuevo estudiante"
        >
          <UserPlus className="mr-2" aria-hidden="true" />
          Agregar Estudiante
        </Button>
      </div>

      <StudentsTable
        students={students || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <StudentFormDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        selectedStudent={selectedStudent}
        selectedStudentClasses={selectedStudentClasses}
      />
    </div>
  );
};

export default Students;