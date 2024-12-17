import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CreateClassForm from "./CreateClassForm";
import { ClassFormData } from "./types/class";

type ClassFormDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: ClassFormData, selectedStudents: string[]) => void;
  onCancel: () => void;
  initialData?: any;
};

const ClassFormDialog = ({
  isOpen,
  onOpenChange,
  onSubmit,
  onCancel,
  initialData,
}: ClassFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Clase" : "Crear Nueva Clase"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Modifica los detalles de la clase y asigna estudiantes"
              : "Ingresa los detalles de la nueva clase y asigna estudiantes"}
          </DialogDescription>
        </DialogHeader>
        <CreateClassForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          initialData={initialData}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ClassFormDialog;