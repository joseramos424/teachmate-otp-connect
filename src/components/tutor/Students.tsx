import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import StudentForm from "./StudentForm";
import StudentsTable from "./StudentsTable";

type Student = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
};

type StudentFormData = {
  first_name: string;
  last_name: string;
  email: string;
};

const Students = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
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

  const addStudentMutation = useMutation({
    mutationFn: async ({ studentData, classIds }: { studentData: StudentFormData; classIds: string[] }) => {
      const { data: newStudent, error: studentError } = await supabase
        .from("students")
        .insert([studentData])
        .select()
        .single();

      if (studentError) throw studentError;

      if (classIds.length > 0) {
        const classesData = classIds.map(classId => ({
          student_id: newStudent.id,
          class_id: classId,
        }));

        const { error: classesError } = await supabase
          .from("students_classes")
          .insert(classesData);

        if (classesError) throw classesError;
      }

      return newStudent;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast({
        title: "Estudiante agregado",
        description: "El estudiante ha sido agregado exitosamente.",
      });
      handleDialogClose();
    },
    onError: (error) => {
      console.error("Error adding student:", error);
      toast({
        title: "Error",
        description: "No se pudo agregar el estudiante. Por favor intente nuevamente.",
        variant: "destructive",
      });
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: async ({ id, data, classIds }: { id: string; data: StudentFormData; classIds: string[] }) => {
      const { error: studentError } = await supabase
        .from("students")
        .update(data)
        .eq("id", id);

      if (studentError) throw studentError;

      // Delete existing class associations
      const { error: deleteError } = await supabase
        .from("students_classes")
        .delete()
        .eq("student_id", id);

      if (deleteError) throw deleteError;

      // Add new class associations
      if (classIds.length > 0) {
        const classesData = classIds.map(classId => ({
          student_id: id,
          class_id: classId,
        }));

        const { error: classesError } = await supabase
          .from("students_classes")
          .insert(classesData);

        if (classesError) throw classesError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast({
        title: "Estudiante actualizado",
        description: "El estudiante ha sido actualizado exitosamente.",
      });
      handleDialogClose();
    },
    onError: (error) => {
      console.error("Error updating student:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estudiante. Por favor intente nuevamente.",
        variant: "destructive",
      });
    },
  });

  const deleteStudentMutation = useMutation({
    mutationFn: async (studentId: string) => {
      const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", studentId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast({
        title: "Estudiante eliminado",
        description: "El estudiante ha sido eliminado exitosamente.",
      });
    },
    onError: (error) => {
      console.error("Error deleting student:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el estudiante. Por favor intente nuevamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: StudentFormData, selectedClasses: string[]) => {
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedStudent(null)} aria-label="Agregar nuevo estudiante">
              <UserPlus className="mr-2" aria-hidden="true" />
              Agregar Estudiante
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedStudent ? "Editar Estudiante" : "Agregar Nuevo Estudiante"}
              </DialogTitle>
            </DialogHeader>
            <StudentForm
              onSubmit={handleSubmit}
              onCancel={handleDialogClose}
              initialData={selectedStudent || undefined}
              initialClasses={selectedStudentClasses || []}
              isEditing={!!selectedStudent}
            />
          </DialogContent>
        </Dialog>
      </div>

      <StudentsTable
        students={students || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Students;
