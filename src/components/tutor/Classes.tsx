import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import CreateClassForm from "./CreateClassForm";
import ClassesTable from "./ClassesTable";

type ClassFormData = {
  name: string;
  description: string;
};

const Classes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingClass, setEditingClass] = React.useState<any>(null);

  const { data: classes, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const addClassMutation = useMutation({
    mutationFn: async ({
      formData,
      selectedStudents,
    }: {
      formData: ClassFormData;
      selectedStudents: string[];
    }) => {
      // First create the class
      const { data: classData, error: classError } = await supabase
        .from("classes")
        .insert([{ name: formData.name, description: formData.description }])
        .select()
        .single();

      if (classError) throw classError;

      // Then create the student-class relationships
      if (selectedStudents.length > 0) {
        const studentClassRelations = selectedStudents.map((studentId) => ({
          student_id: studentId,
          class_id: classData.id,
        }));

        const { error: relationError } = await supabase
          .from("students_classes")
          .insert(studentClassRelations);

        if (relationError) throw relationError;
      }

      return classData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast({
        title: "Clase creada",
        description: "La clase ha sido creada exitosamente.",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      console.error("Error creating class:", error);
      toast({
        title: "Error",
        description: "No se pudo crear la clase. Por favor intente nuevamente.",
        variant: "destructive",
      });
    },
  });

  const updateClassMutation = useMutation({
    mutationFn: async ({
      classId,
      formData,
      selectedStudents,
    }: {
      classId: string;
      formData: ClassFormData;
      selectedStudents: string[];
    }) => {
      // Update class details
      const { error: updateError } = await supabase
        .from("classes")
        .update({ name: formData.name, description: formData.description })
        .eq("id", classId);

      if (updateError) throw updateError;

      // Delete existing student relationships
      const { error: deleteError } = await supabase
        .from("students_classes")
        .delete()
        .eq("class_id", classId);

      if (deleteError) throw deleteError;

      // Create new student relationships
      if (selectedStudents.length > 0) {
        const studentClassRelations = selectedStudents.map((studentId) => ({
          student_id: studentId,
          class_id: classId,
        }));

        const { error: relationError } = await supabase
          .from("students_classes")
          .insert(studentClassRelations);

        if (relationError) throw relationError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      toast({
        title: "Clase actualizada",
        description: "La clase ha sido actualizada exitosamente.",
      });
      setIsDialogOpen(false);
      setEditingClass(null);
    },
    onError: (error) => {
      console.error("Error updating class:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la clase. Por favor intente nuevamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (formData: ClassFormData, selectedStudents: string[]) => {
    if (editingClass) {
      updateClassMutation.mutate({
        classId: editingClass.id,
        formData,
        selectedStudents,
      });
    } else {
      addClassMutation.mutate({ formData, selectedStudents });
    }
  };

  if (isLoading) {
    return (
      <div className="p-8" role="status" aria-live="polite">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Clases</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button aria-label="Crear nueva clase">
              <Book className="mr-2" aria-hidden="true" />
              Crear Clase
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingClass ? "Editar Clase" : "Crear Nueva Clase"}
              </DialogTitle>
            </DialogHeader>
            <CreateClassForm
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingClass(null);
              }}
              initialData={editingClass}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ClassesTable
        classes={classes || []}
        onEdit={(classItem) => {
          setEditingClass(classItem);
          setIsDialogOpen(true);
        }}
      />
    </div>
  );
};

export default Classes;