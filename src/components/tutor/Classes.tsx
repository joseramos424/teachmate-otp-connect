import React from "react";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateClassForm from "./CreateClassForm";
import ClassesTable from "./ClassesTable";
import { useClasses, type ClassFormData } from "@/hooks/useClasses";

const Classes = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingClass, setEditingClass] = React.useState<any>(null);
  const { classes, isLoading, addClassMutation, updateClassMutation } = useClasses();

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
    setIsDialogOpen(false);
    setEditingClass(null);
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