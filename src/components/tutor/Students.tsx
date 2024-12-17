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

  const addStudentMutation = useMutation({
    mutationFn: async (newStudent: StudentFormData) => {
      const { data, error } = await supabase
        .from("students")
        .insert([newStudent])
        .select()
        .single();

      if (error) throw error;
      return data;
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
    mutationFn: async ({ id, ...updateData }: StudentFormData & { id: string }) => {
      const { data, error } = await supabase
        .from("students")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
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

  const handleSubmit = (data: StudentFormData) => {
    if (selectedStudent) {
      updateStudentMutation.mutate({ ...data, id: selectedStudent.id });
    } else {
      addStudentMutation.mutate(data);
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
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
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button aria-label="Agregar nuevo estudiante">
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
              isEditing={!!selectedStudent}
            />
          </DialogContent>
        </Dialog>
      </div>

      <StudentsTable
        students={students || []}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Students;