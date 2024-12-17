import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import ClassesTable from "./ClassesTable";
import ClassFormDialog from "./ClassFormDialog";
import { useClassMutations } from "./hooks/useClassMutations";
import type { Class, ClassFormData } from "./types/class";

const Classes = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingClass, setEditingClass] = React.useState<Class | null>(null);
  const { addClassMutation, updateClassMutation } = useClassMutations();

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
        <Button
          onClick={() => setIsDialogOpen(true)}
          aria-label="Crear nueva clase"
        >
          <Book className="mr-2" aria-hidden="true" />
          Crear Clase
        </Button>
      </div>

      <ClassFormDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
        onCancel={() => {
          setIsDialogOpen(false);
          setEditingClass(null);
        }}
        initialData={editingClass}
      />

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