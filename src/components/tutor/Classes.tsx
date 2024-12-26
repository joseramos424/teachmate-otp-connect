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
  const { 
    classes, 
    isLoading, 
    addClassMutation, 
    updateClassMutation,
    deleteClassMutation 
  } = useClasses();

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

  const handleDelete = (classItem: any) => {
    if (window.confirm(`¿Está seguro de eliminar la clase ${classItem.name}?`)) {
      deleteClassMutation.mutate(classItem.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-live="polite">
        <div className="animate-pulse text-[#8E9196]">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-[#E5DEFF] to-[#F6F6F7] p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-[#1A1F2C]">Clases</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-colors"
              aria-label="Crear nueva clase"
            >
              <Book className="mr-2 h-4 w-4" aria-hidden="true" />
              Crear Clase
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-[#1A1F2C]">
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

      <div className="bg-white rounded-lg shadow-sm">
        <ClassesTable
          classes={classes || []}
          onEdit={(classItem) => {
            setEditingClass(classItem);
            setIsDialogOpen(true);
          }}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Classes;